package com.paypercash.server.repository;

import com.paypercash.server.models.GerenteOcorrencias;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GerenteOcorrenciasRepository extends JpaRepository<GerenteOcorrencias, Long>{}
