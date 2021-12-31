package com.paypercash.server.repository;

import com.paypercash.server.models.CategoriaOcorrencia;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaOcorrenciaRepository extends JpaRepository<CategoriaOcorrencia, Long>{
	
	public CategoriaOcorrencia findByNome(String nome);
	
}
