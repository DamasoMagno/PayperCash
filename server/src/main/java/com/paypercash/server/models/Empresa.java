package com.paypercash.server.models;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.List;
import java.util.Objects;

@Entity
public class Empresa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome; 

	private String email;

	private String senha;

	private String endereco;

	private Date data_criacao;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
	private List<Tecnico> tecnicos;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
	private List<GerenteOcorrencias> gerenteOcorrencias;

	public Long getId() {
		return this.id;
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return this.senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEndereco() {
		return this.endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public Date getData_criacao() {
		return this.data_criacao;
	}

	public void setData_criacao(Date data_criacao) {
		this.data_criacao = data_criacao;
	}

	public List<Tecnico> getTecnicos() {
		return this.tecnicos;
	}

	public List<GerenteOcorrencias> getGerenteOcorrencias() {
		return this.gerenteOcorrencias;
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
		Empresa other = (Empresa) obj;
		return Objects.equals(id, other.id);
	}

  
}
