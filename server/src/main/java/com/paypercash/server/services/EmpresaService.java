package com.paypercash.server.services;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.repository.EmpresaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

  @Autowired
  private EmpresaRepository empresaRepository;

  public Empresa obterEmpresa(Long id){
    Empresa empresaEncontrada = empresaRepository.findById(id).orElse(null);
    return empresaEncontrada;
  }

  public Empresa criarEmpresa(Empresa empresa){
    Empresa empresaJaExiste = empresaRepository.findByEmail(empresa.getEmail());

    if(empresaJaExiste != null){
      return null;
    }

    empresaRepository.save(empresa);
    return empresa;
  }  
  
  public Empresa atualizarEmpresaDados(Empresa empresa, Long id){
    System.out.print(id);

    Empresa empresaEncontrada = empresaRepository.findById(id).get();

    if(empresaEncontrada == null){
      System.out.println("Nenhuma empresa encontrada");
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
      empresaEncontrada.setSenha(empresa.getSenha());
    }

    return empresaEncontrada;
  }
}

