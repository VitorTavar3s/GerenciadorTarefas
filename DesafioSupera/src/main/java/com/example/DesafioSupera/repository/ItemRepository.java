package com.example.DesafioSupera.repository;

import com.example.DesafioSupera.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByListaId(Long listaId);
}
