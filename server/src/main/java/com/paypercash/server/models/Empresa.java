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

@Entity
public class Empresa implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
  private List<Tecnico> tecnicos;

  @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
  private List<GerenteOcorrencias> gerenteOcorrencias;

  private String nome; 

  private String email;

  private String senha;

  private String endereco;

  private Date data_criacao;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public List<Tecnico> getTecnicos() {
    return this.tecnicos;
  }

  public void setTecnicos(List<Tecnico> tecnicos) {
    this.tecnicos = tecnicos;
  }

  public List<GerenteOcorrencias> getGerenteOcorrencias() {
    return this.gerenteOcorrencias;
  }

  public void setGerenteOcorrencias(List<GerenteOcorrencias> gerenteOcorrencias) {
    this.gerenteOcorrencias = gerenteOcorrencias;
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
}
