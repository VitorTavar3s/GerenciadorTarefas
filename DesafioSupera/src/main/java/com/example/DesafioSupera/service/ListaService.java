package com.example.DesafioSupera.service;

import com.example.DesafioSupera.model.Lista;
import com.example.DesafioSupera.repository.ListaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaService {

    @Autowired
    private ListaRepository listaRepository;


    public Lista criarLista(Lista lista) {
        return listaRepository.save(lista);
    }

    public List<Lista> getAllListas() {
        return listaRepository.findAll();
    }

    public Lista getListaById(Long id) {
        return listaRepository.findById(id).orElse(null);
    }

    public Lista atualizarLista(Long id, Lista listaAtualizada) {
        Lista lista = getListaById(id);
        lista.setTitulo(listaAtualizada.getTitulo());
        lista.getItens().clear();
        lista.getItens().addAll(listaAtualizada.getItens());
        lista.getItens().forEach(item -> item.setLista(lista));
        return listaRepository.save(lista);
    }

    public void excluirLista(Long id) {
        Lista lista = getListaById(id);
        listaRepository.delete(lista);
    }
}
