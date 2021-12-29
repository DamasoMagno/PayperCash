package com.paypercash.server.services;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.repository.TecnicoRepository;

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
	@Autowired
	private TecnicoRepository tecnicoRepository;
	
	public Ocorrencia obterOcorrencia(Long id){
		Ocorrencia ocorrenciaJaExiste = ocorrenciaRepository.findById(id).orElse(null);
		return ocorrenciaJaExiste;
	}

	public Ocorrencia atenderOcorrencia(Long id, Tecnico tecnico) {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);
		if(tecnico.getEmail() != null){
			Tecnico tecnicoEncontrado = tecnicoRepository.findByEmail(tecnico.getEmail());
			ocorrenciaExiste.setTecnico(tecnicoEncontrado);
		}
		Ocorrencia ocorrenciaNaoPendente = ocorrenciaRepository.save(ocorrenciaExiste);
		return ocorrenciaNaoPendente;
		
	}
	
	public Ocorrencia finalizarOcorrencia(Ocorrencia ocorrencia, Long id) {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);
		if(ocorrencia.getResolucao() != null && ocorrenciaExiste.getTecnico() != null ){
			ocorrenciaExiste.setResolucao(ocorrencia.getResolucao());
		} else {
			throw new Error("Nenhum tecnico, ocupado com esta ocorrencia");
		}
		Ocorrencia novaOcorrencia = ocorrenciaRepository.save(ocorrenciaExiste);
		return novaOcorrencia;
	}

	public Ocorrencia criarOcorrencia(Ocorrencia ocorrencia, Long id){
		Ocorrencia ocorrenciJaExiste = obterOcorrencia(ocorrencia.getId());
		CategoriaOcorrencia categoriaEncontrada = categoriaOcorrenciaRepository.findByNome(ocorrencia.getTipo_categoria());

		if(ocorrenciJaExiste != null){
			throw new Error("Esta ocorrencia, já está cadastrada no sitema");
		}

		GerenteOcorrencias gerenteOcorrenciasEcontrando = gerenteOcorrenciasRepository.findById(id).get();
		
		ocorrencia.setGerenteOcorrencias(gerenteOcorrenciasEcontrando);
		ocorrencia.setCategoriaOcorrencia(categoriaEncontrada);

		Ocorrencia ocorrenciaCriada = ocorrenciaRepository.save(ocorrencia);

		return ocorrenciaCriada;
	}

}
