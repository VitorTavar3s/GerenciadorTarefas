package com.example.DesafioSupera.controller;

import com.example.DesafioSupera.model.Lista;
import com.example.DesafioSupera.service.ListaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ListaControllerTest {

    @InjectMocks
    private ListaController listaController;

    @Mock
    private ListaService listaService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarLista() {
        Lista novaLista = new Lista();
        novaLista.setTitulo("Nova Lista");

        when(listaService.criarLista(any(Lista.class))).thenReturn(novaLista);

        ResponseEntity<Lista> response = listaController.criarLista(novaLista);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(novaLista, response.getBody());
    }

    @Test
    public void testListarListas() {
        Lista lista1 = new Lista();
        Lista lista2 = new Lista();
        when(listaService.getAllListas()).thenReturn(Arrays.asList(lista1, lista2));

        ResponseEntity<List<Lista>> response = listaController.listarListas();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    public void testBuscarListaPorId() {
        Lista lista = new Lista();
        when(listaService.getListaById(1L)).thenReturn(lista);

        ResponseEntity<Lista> response = listaController.buscarListaPorId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(lista, response.getBody());
    }

    @Test
    public void testAtualizarLista() {
        Lista listaAtualizada = new Lista();
        when(listaService.atualizarLista(eq(1L), any(Lista.class))).thenReturn(listaAtualizada);

        ResponseEntity<Lista> response = listaController.atualizarLista(1L, listaAtualizada);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(listaAtualizada, response.getBody());
    }

    @Test
    public void testDeletarLista() {
        doNothing().when(listaService).excluirLista(1L);

        ResponseEntity<Lista> response = listaController.deletarLista(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}
