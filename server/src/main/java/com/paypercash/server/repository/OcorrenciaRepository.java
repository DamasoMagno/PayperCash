package com.paypercash.server.repository;

import com.paypercash.server.models.Ocorrencia;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
	public Ocorrencia findByDataCriacao(Date dataCriacao);
}
