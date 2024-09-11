package com.example.DesafioSupera.repository;

import com.example.DesafioSupera.model.Lista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
}
