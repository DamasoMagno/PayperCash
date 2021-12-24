package com.paypercash.server.services;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService {

  @Autowired
  private TecnicoRepository tecnicoRepository;
  @Autowired
  private EmpresaService empresaService;

  public Tecnico obterTecnico(String email){
    return tecnicoRepository.findByEmail(email);
  }

  public Tecnico criarTecnico(Tecnico tecnico, Long id){
    Empresa empresa = empresaService.obterEmpresaPeloId(id);
    
    Tecnico tecnicoJaExiste = obterTecnico(tecnico.getEmail());

    if(tecnicoJaExiste != null ){
      throw new Error("Este técnico já existe");
    }

    tecnico.setEmpresa(empresa);

    Tecnico novoTecnico = tecnicoRepository.save(tecnico);

    return novoTecnico;
  }

  public Tecnico atualizarTecnico(Tecnico tecnico){
    Tecnico tecnicoEncontrado = obterTecnico(tecnico.getEmail());

    if(tecnicoEncontrado == null){
      throw new Error("Nenhum tecnico encontrado");
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
