package com.paypercash.server.controllers;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.services.EmpresaService;
import com.paypercash.server.repository.EmpresaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/enterprises")
@RestController
public class EmpresaController {

  @Autowired
  private EmpresaRepository empresaRepository;

  @Autowired
  private EmpresaService empresaServices;

  @GetMapping
  public List<Empresa> exibirEmpresas(){
    return empresaRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> exibirEmpresa(@PathVariable Long id){
    Empresa empresa = empresaRepository.findById(id).get();

    if(empresa == null){
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    return ResponseEntity.status(HttpStatus.OK).body(empresa);
  }

  @PostMapping
  public ResponseEntity<Empresa> criarEmpresa(@RequestBody Empresa empresa){
    Empresa empresaCriada = empresaServices.criarEmpresa(empresa); 

    return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
  }  

  @DeleteMapping("/{id}")
  public void apagarEmpresa(@PathVariable Long id){
    empresaRepository.deleteById(id);
  }

  @PutMapping("/{id}")
  public Empresa atualizarEmpresa(@RequestBody Empresa empresa, @PathVariable Long id){
    System.out.print(id);

    Empresa empresaAlterada = empresaServices.atualizarEmpresaDados(empresa, id);

    empresaRepository.save(empresaAlterada);

    return empresaAlterada;
  }
}
