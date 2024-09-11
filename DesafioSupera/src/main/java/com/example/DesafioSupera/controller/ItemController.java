package com.example.DesafioSupera.controller;

import com.example.DesafioSupera.model.Item;
import com.example.DesafioSupera.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listas/{listaId}/itens")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;


    @PostMapping
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    public ResponseEntity<Item> adicionarItem(@PathVariable Long listaId, @RequestBody @Valid Item item) {
        Item novoItem = itemService.criarItem(listaId, item);
        return new ResponseEntity<>(novoItem, HttpStatus.CREATED);
    }

    @GetMapping
    @CrossOrigin(origins = "*",allowedHeaders = "*")
    ResponseEntity<List<Item>> listarItens(@PathVariable Long listaId) {
        List<Item> itens = itemService.getAllItensByListaId(listaId);
        return ResponseEntity.ok(itens);
    }

    @GetMapping("/{itemId}")
    ResponseEntity<Item> buscarItemPorID(@PathVariable Long itemId) {
        Item item = itemService.getItemById(itemId);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Item> atualizarItem(@PathVariable Long itemId, @RequestBody @Valid Item itemAtualizado) {
        Item item = itemService.atualizarItem(itemId,itemAtualizado);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removerItem(@PathVariable Long listaId, @PathVariable Long itemId) {
        itemService.excluirItem(listaId,itemId);
        return ResponseEntity.noContent().build();
    }

}
