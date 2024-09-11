package com.example.DesafioSupera.service;


import com.example.DesafioSupera.model.Item;
import com.example.DesafioSupera.model.Lista;
import com.example.DesafioSupera.repository.ItemRepository;
import com.example.DesafioSupera.repository.ListaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ListaRepository listaRepository;


    public Item criarItem(Long listaId,Item item) {
        Lista lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista não encontrada com ID: " + listaId));
        item.setLista(lista);
        return itemRepository.save(item);
    }

    public List<Item> getAllItensByListaId(Long listaId) {
        return itemRepository.findByListaId(listaId);
    }

    public Item getItemById(Long id) {
        Optional<Item> item = itemRepository.findById(id);
        return item.orElseThrow(() -> new RuntimeException("Item não encontrado com ID: " + id));
    }

    public Item atualizarItem(Long id, Item itemAtualizado) {
        Item item = getItemById(id);
        item.setTitulo(itemAtualizado.getTitulo());
        item.setEstado(itemAtualizado.getEstado());
        item.setPrioridade(itemAtualizado.isPrioridade());
        return itemRepository.save(item);
    }

    public void excluirItem(Long listaId,Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item não encontrado com ID: " + itemId));

        if (!item.getLista().getId().equals(listaId)) {
            throw new RuntimeException("Item com ID " + itemId + " não pertence à lista com ID " + listaId);
        }
        itemRepository.delete(item);
    }
}
