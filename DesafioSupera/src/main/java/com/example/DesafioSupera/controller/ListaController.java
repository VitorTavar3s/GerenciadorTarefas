package com.example.DesafioSupera.controller;

import com.example.DesafioSupera.model.Lista;
import com.example.DesafioSupera.service.ListaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listas")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class ListaController {

    @Autowired
    private ListaService listaService;

    @PostMapping
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    public ResponseEntity<Lista> criarLista(@RequestBody @Valid Lista lista) {
        Lista novaLista = listaService.criarLista(lista);
        return new ResponseEntity<>(novaLista, HttpStatus.CREATED);
    }

    @GetMapping
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    public ResponseEntity<List<Lista>> listarListas(){
        List<Lista> listas = listaService.getAllListas();
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    public ResponseEntity<Lista> buscarListaPorId(@PathVariable Long id){
        Lista lista = listaService.getListaById(id);
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lista> atualizarLista(@PathVariable Long id,@RequestBody @Valid Lista listaAtualizada){
        Lista lista = listaService.atualizarLista(id, listaAtualizada);
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Lista> deletarLista(@PathVariable Long id){
        listaService.excluirLista(id);
        return ResponseEntity.noContent().build();
    }

}
