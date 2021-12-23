package com.paypercash.server.services;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService {

  @Autowired
  private TecnicoRepository tecnicoRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  private EmpresaRepository empresaRepository;

  public Tecnico obterTecnico(String email){
    return tecnicoRepository.findByEmail(email);
  }

  public Tecnico criarTecnico(Tecnico tecnico, Long id){
    Empresa empresa = empresaRepository.findById(id).get();
    Tecnico tecnicoJaExiste = obterTecnico(tecnico.getEmail());

    if(tecnicoJaExiste != null ){
      throw new Error("Este técnico já existe");
    }

    tecnico.setEmpresa(empresa);
    tecnico.setSenha(passwordEncoder.encode(tecnico.getSenha()));

    Tecnico novoTecnico = tecnicoRepository.save(tecnico);

    return novoTecnico;
  }

  public Tecnico atualizarTecnico(Tecnico tecnico){
    Tecnico tecnicoEncontrado = obterTecnico(tecnico.getEmail());

    if(tecnicoEncontrado == null){
      throw new Error("Nenhum tecnico encontrada");
    }

    if(tecnico.getEmail() != null){
      tecnicoEncontrado.setEmail(tecnico.getEmail());
    } 

    if(tecnico.getNome() != null){
      tecnicoEncontrado.setNome(tecnico.getNome());
    }

    if(tecnico.getSenha() != null){
      tecnicoEncontrado.setSenha(passwordEncoder.encode(tecnico.getSenha()));
    }

    return tecnicoEncontrado;
  }
}
