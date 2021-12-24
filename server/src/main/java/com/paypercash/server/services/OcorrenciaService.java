package com.paypercash.server.services;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.repository.OcorrenciaRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OcorrenciaService {
	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;

	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;

	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;
	
	public Ocorrencia obterOcorrencia(Long id){
		Ocorrencia ocorrenciaJaExiste = ocorrenciaRepository.findById(id).orElse(null);
		return ocorrenciaJaExiste;
	}

	public Ocorrencia finalizarOcorrencia(Ocorrencia ocorrencia, Long id) {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);

		if(ocorrencia.getResolucao() != null){
			ocorrenciaExiste.setResolucao(ocorrencia.getResolucao());
		}

		Ocorrencia novaOcorrencia = ocorrenciaRepository.save(ocorrenciaExiste);

		return novaOcorrencia;
	}

	public Ocorrencia criarOcorrencia(Ocorrencia ocorrencia, Long id){
		Ocorrencia ocorrenciJaExiste = obterOcorrencia(ocorrencia.getId());

		if(ocorrenciJaExiste != null){
			throw new Error("Esta ocorrencia, já está cadastrada no ssitema");
		}

		GerenteOcorrencias gerenteOcorrenciasEcontrando = gerenteOcorrenciasRepository.findById(id).get();
		
		ocorrencia.setGerenteOcorrencias(gerenteOcorrenciasEcontrando);

		Ocorrencia ocorrenciaCriada = ocorrenciaRepository.save(ocorrencia);

		return ocorrenciaCriada;
	}

}
