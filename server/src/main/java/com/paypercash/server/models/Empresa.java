package com.paypercash.server.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.Objects;
import java.util.Set;

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
	
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "PERFIS")
	private Set<Integer> perfis;
	
	private Date data_criacao = new Date();
	
	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Tecnico> tecnicos;
	
	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Ocorrencia> ocorrencias;
 
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<GerenteOcorrencias> gerenteOcorrencias;
	
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

	@JsonIgnore
	public String getSenha() {
		return this.senha;
	}

	@JsonProperty
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

	public Set<Tecnico> getTecnicos() {
		return this.tecnicos;
	}

	public Set<GerenteOcorrencias> getGerenteOcorrencias() {
		return this.gerenteOcorrencias;
	}
	
	public Set<Ocorrencia> getOcorrencias(){
		return this.ocorrencias;
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
