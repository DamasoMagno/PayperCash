package com.paypercash.server.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
public class CategoriaOcorrencia implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	
	@OneToMany(mappedBy = "categoriaOcorrencia", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Ocorrencia> ocorrencia;

	
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Set<Ocorrencia> getOcorrencia() {
		return ocorrencia;
	}

	public void setOcorrencia(Set<Ocorrencia> ocorrencia) {
		this.ocorrencia = ocorrencia;
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
