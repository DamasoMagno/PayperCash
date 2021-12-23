package com.paypercash.server.repository;

import com.paypercash.server.models.Tecnico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {

  public Tecnico findByEmail(String email);

}
