package com.paypercash.server.repository;

import com.paypercash.server.models.Empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
  public Empresa findByEmail(String email);
}
