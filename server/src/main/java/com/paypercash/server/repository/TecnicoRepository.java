package com.paypercash.server.repository;

import com.paypercash.server.models.Tecnico;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paypercash.server.models.Empresa;
import java.util.List;

public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {

  public List<Tecnico> findByEmpresa(Empresa empresa);

}
