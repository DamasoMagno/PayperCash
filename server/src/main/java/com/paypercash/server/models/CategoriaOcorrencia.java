package com.paypercash.server.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CategoriaOcorrencia {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String tipo_categoria;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTipo_categoria() {
    return this.tipo_categoria;
  }

  public void setTipo_categoria(String tipo_categoria) {
    this.tipo_categoria = tipo_categoria;
  }

}
