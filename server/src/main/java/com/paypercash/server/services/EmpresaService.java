package com.paypercash.server.services;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.repository.EmpresaRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

  @Autowired
  private EmpresaRepository empresaRepository;
  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  public Empresa obterEmpresaPeloEmail(String email){
    return empresaRepository.findByEmail(email);
  }

  public Empresa obterEmpresaPeloId(Long id){
    return empresaRepository.findById(id).get();
  }

  public Empresa criarEmpresa(Empresa empresa){
    List<Empresa> empresaJaExiste = empresaRepository.findAll();
    
    if(empresaJaExiste.size() == 1){
      throw new Error("Não é possivel cadastrar mais de uma empresa no ssitema");
    }
    
    empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));
    empresaRepository.save(empresa);
    
    return empresa;
  }  
  
  public Empresa atualizarEmpresaDados(Empresa empresa, Long id){
    Empresa empresaEncontrada = obterEmpresaPeloId(id);

    if(empresaEncontrada == null){
      throw new Error("Esta empresa não existe");
    }

    if(empresa.getEmail() != null){
      empresaEncontrada.setEmail(empresa.getEmail());
    } 

    if(empresa.getEndereco() != null){
      empresaEncontrada.setEndereco(empresa.getEndereco());
    } 

    if(empresa.getNome() != null){
      empresaEncontrada.setNome(empresa.getNome());
    }

    if(empresa.getSenha() != null){
      empresaEncontrada.setSenha(passwordEncoder.encode(empresa.getSenha()));
    }
    
    Empresa empresaAtualizada = empresaRepository.save(empresaEncontrada);
    
    return empresaAtualizada;
  }
}