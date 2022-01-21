package com.paypercash.server.dtos;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.paypercash.server.enums.OcurrencyStatus;
import com.paypercash.server.models.Ocorrencia;

public class OcorrenciaDTO {
	private Long id;

	private String titulo;

	private String descricao;

	private String tipo_categoria;

	private String resolucao;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime dataCriacao;

	private OcurrencyStatus status;
	
	private String gerente;
	
	private String endereco;
	
	private String tecnico;
	
	public OcorrenciaDTO() {}

	public OcorrenciaDTO(Ocorrencia ocorrencia) {
		this.id = ocorrencia.getId();
		this.titulo = ocorrencia.getTitulo();
		this.descricao = ocorrencia.getDescricao();
		this.tipo_categoria = ocorrencia.getTipo_categoria();
		this.resolucao = ocorrencia.getResolucao();
		this.status = ocorrencia.getStatus();
		this.dataCriacao = ocorrencia.getDataCriacao();
		this.gerente = ocorrencia.getGerenteOcorrencias().getNome();
		this.endereco = ocorrencia.getGerenteOcorrencias().getEndereco();
		if(ocorrencia.getTecnico() != null) {
			this.tecnico = ocorrencia.getTecnico().getNome();
		}
	}

	public Long getId() {
		return id;
	}

	public String getTitulo() {
		return titulo;
	}

	public String getDescricao() {
		return descricao;
	}


	public String getTipo_categoria() {
		return tipo_categoria;
	}


	public String getResolucao() {
		return resolucao;
	}

	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}

	public OcurrencyStatus getStatus() {
		return status;
	}

	public String getGerente() {
		return gerente;
	}


	public String getEndereco() {
		return endereco;
	}

	public String getTecnico() {
		return tecnico;
	}
	
}
