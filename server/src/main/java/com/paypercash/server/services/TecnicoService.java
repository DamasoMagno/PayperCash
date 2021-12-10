package com.paypercash.server.services;

import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService {

  @Autowired
  private TecnicoRepository tecnicoRepository;
  
  public Tecnico atualizarTecnico(Tecnico tecnico, Long id){
    Tecnico tecnicoEncontrado = tecnicoRepository.findById(id).get();

    if(tecnicoEncontrado == null){
      System.out.println("Nenhuma tecnico encontrada");
    }

    if(tecnico.getEmail() != null){
    tecnicoEncontrado.setEmail(tecnico.getEmail());
    } 

    if(tecnico.getNome() != null){
    tecnicoEncontrado.setNome(tecnico.getNome());
    }

    if(tecnico.getSenha() != null){
    tecnicoEncontrado.setSenha(tecnico.getSenha());
    }

    return tecnicoEncontrado;
  }

}
