package com.paypercash.server.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ocorrencia {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "gerente_ocorrencia_id")
  @JsonIgnore
  private GerenteOcorrencias gerenteOcorrencias;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "tecnico_id")
  @JsonIgnore
  private Tecnico tecnico;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn( name = "categoria_ocorrencia_id" )
  @JsonIgnore
  private CategoriaOcorrencia categoriaOcorrencia;

  private String titulo;

  private String descricao;

  private String resolucao;

  private Date data_criacao;

  private Date data_finalizacao;  

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

  public Date getData_criacao() {
    return this.data_criacao;
  }

  public void setData_criacao(Date data_criacao) {
    this.data_criacao = data_criacao;
  }

  public Date getData_finalizacao() {
    return this.data_finalizacao;
  }

  public void setData_finalizacao(Date data_finalizacao) {
    this.data_finalizacao = data_finalizacao;
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
}
