package com.paypercash.server.repository;

import com.paypercash.server.models.Tecnico;

import org.springframework.stereotype.Repository;

@Repository
public interface TecnicoRepository extends TipoUsuarioRepository<Tecnico>{}
