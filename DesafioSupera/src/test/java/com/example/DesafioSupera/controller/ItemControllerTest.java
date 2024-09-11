package com.example.DesafioSupera.controller;

import com.example.DesafioSupera.model.Item;
import com.example.DesafioSupera.service.ItemService;
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

public class ItemControllerTest {

    @InjectMocks
    private ItemController itemController;

    @Mock
    private ItemService itemService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAdicionarItem() {
        Item item = new Item();
        item.setTitulo("Novo Item");
        when(itemService.criarItem(anyLong(), any(Item.class))).thenReturn(item);

        ResponseEntity<Item> response = itemController.adicionarItem(1L, item);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(item, response.getBody());
    }

    @Test
    public void testListarItens() {
        Item item1 = new Item();
        Item item2 = new Item();
        when(itemService.getAllItensByListaId(anyLong())).thenReturn(Arrays.asList(item1, item2));

        ResponseEntity<List<Item>> response = itemController.listarItens(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    public void testBuscarItemPorID() {
        Item item = new Item();
        when(itemService.getItemById(anyLong())).thenReturn(item);

        ResponseEntity<Item> response = itemController.buscarItemPorID(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(item, response.getBody());
    }

    @Test
    public void testAtualizarItem() {
        Item itemAtualizado = new Item();
        when(itemService.atualizarItem(anyLong(), any(Item.class))).thenReturn(itemAtualizado);

        ResponseEntity<Item> response = itemController.atualizarItem(1L, itemAtualizado);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(itemAtualizado, response.getBody());
    }

    @Test
    public void testRemoverItem() {
        doNothing().when(itemService).excluirItem(anyLong(), anyLong());

        ResponseEntity<Void> response = itemController.removerItem(1L, 1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

}
