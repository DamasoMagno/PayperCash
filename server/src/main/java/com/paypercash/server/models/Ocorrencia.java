package com.paypercash.server.models;

import java.io.Serializable;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ocorrencia implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gerente_ocorrencia_id")
	@JsonIgnore
	private GerenteOcorrencias gerenteOcorrencias;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "empresa_id")
	@JsonIgnore
	private Empresa empresa;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tecnico_id")
	@JsonIgnore
	private Tecnico tecnico;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn( name = "categoria_ocorrencia_id" )
	@JsonIgnore
	private CategoriaOcorrencia categoriaOcorrencia;
	
	private String tipo_categoria;

	public String getTipo_categoria() {
		return tipo_categoria;
	}

	public void setTipo_categoria(String tipo_categoria) {
		this.tipo_categoria = tipo_categoria;
	}
	
	public Empresa setEmpresa(Empresa empresa) {
		return this.empresa = empresa;
	}

	private String titulo;

	private String descricao;

	private String resolucao;

	private Date dataCriacao = new Date();

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return this.titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getResolucao() {
		return this.resolucao;
	}

	public void setResolucao(String resolucao) {
		this.resolucao = resolucao;
	}

	public Date getDataCriacao() {
		return this.dataCriacao;
	}

	public GerenteOcorrencias getGerenteOcorrencias() {
		return this.gerenteOcorrencias;
	}

	public void setGerenteOcorrencias(GerenteOcorrencias gerenteOcorrencias) {
		this.gerenteOcorrencias = gerenteOcorrencias;
	}

	public void setTecnico(Tecnico tecnico) {
		this.tecnico = tecnico;
	}

	public Tecnico getTecnico() {
		return this.tecnico;
	}

	public CategoriaOcorrencia getCategoriaOcorrencia() {
		return this.categoriaOcorrencia;
	}

	public void setCategoriaOcorrencia(CategoriaOcorrencia categoriaOcorrencia) {
		this.categoriaOcorrencia = categoriaOcorrencia;
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
		Ocorrencia other = (Ocorrencia) obj;
		return Objects.equals(id, other.id);
	}    


}
