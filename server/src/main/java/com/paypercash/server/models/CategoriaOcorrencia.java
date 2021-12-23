package com.paypercash.server.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.List;
import java.util.Objects;

@Entity
public class CategoriaOcorrencia {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "categoriaOcorrencia")
  private List<Ocorrencia> ocorrencia;

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

@Override
public int hashCode() {
	return Objects.hash(id);
}

@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	CategoriaOcorrencia other = (CategoriaOcorrencia) obj;
	return Objects.equals(id, other.id);
}
  
  

}
