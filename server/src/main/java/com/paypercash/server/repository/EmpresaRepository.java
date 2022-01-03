package com.paypercash.server.repository;

import com.paypercash.server.models.Empresa;

import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends TipoUsuarioRepository<Empresa>{}
