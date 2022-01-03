package com.paypercash.server.repository;

import com.paypercash.server.models.Ocorrencia;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
	public Ocorrencia findByDataCriacao(LocalDateTime dataCriacao);
}
