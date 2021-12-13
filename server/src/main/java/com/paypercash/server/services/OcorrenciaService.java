package com.paypercash.server.services;

import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.repository.OcorrenciaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OcorrenciaService {
  @Autowired
  private OcorrenciaRepository ocorrenciaRepository;

  @Autowired
  private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;

  public Ocorrencia obterOcorrencia(Long id){
    Ocorrencia ocorrenciaJaExiste = ocorrenciaRepository.findById(id).orElse(null);
    return ocorrenciaJaExiste;
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
