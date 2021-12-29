package com.paypercash.server.services;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.TecnicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService {

  @Autowired
  private TecnicoRepository tecnicoRepository;
  @Autowired
  private EmpresaService empresaService;
  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  public Tecnico obterTecnicoPeloEmail(String email){
    return tecnicoRepository.findByEmail(email);
  }
  
  public Tecnico obterTecnicoPeloId(Long id){
	return tecnicoRepository.findById(id).get();
  }

  public Tecnico criarTecnico(Tecnico tecnico, Long id){
    Empresa empresa = empresaService.obterEmpresaPeloId(id);
    tecnico.setEmpresa(empresa);
    tecnico.setSenha(passwordEncoder.encode(tecnico.getSenha()));
    Tecnico novoTecnico = tecnicoRepository.save(tecnico);
    return novoTecnico;
  }

  public Tecnico atualizarTecnico(Tecnico tecnico, Long id){
    Tecnico tecnicoEncontrado = obterTecnicoPeloId(tecnico.getId());

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
      tecnicoEncontrado.setSenha(passwordEncoder.encode(tecnico.getSenha()));
    }

    Tecnico novoTecnico = tecnicoRepository.save(tecnicoEncontrado);
    return novoTecnico;
  }
}
