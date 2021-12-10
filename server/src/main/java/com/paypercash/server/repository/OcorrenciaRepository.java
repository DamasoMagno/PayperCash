package com.paypercash.server.repository;

import com.paypercash.server.models.Ocorrencia;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
  
}
