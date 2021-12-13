  package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.services.EmpresaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/manager")
@RestController
public class GerenteOcorrenciasController {
  
  @Autowired
  private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;

  @Autowired
  private EmpresaService empresaService;

  @GetMapping
  public List<GerenteOcorrencias> listarTodos(){
    return gerenteOcorrenciasRepository.findAll();
  }

  @PostMapping("/{id}")
  public ResponseEntity<?> criarGerente( @RequestBody GerenteOcorrencias gerenteOcorrencias, @PathVariable Long id){
    Empresa empresa = empresaService.obterEmpresa(id);
    try {
      gerenteOcorrencias.setEmpresa(empresa);
      GerenteOcorrencias gerente = gerenteOcorrenciasRepository.save(gerenteOcorrencias);
      return ResponseEntity.status(HttpStatus.CREATED).body(gerente);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> atualizarDados( @RequestBody GerenteOcorrencias gerenteOcorrencias, @PathVariable Long id){
    GerenteOcorrencias gerente = gerenteOcorrenciasRepository.findById(id).get();

    if(gerente == null){
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gerente nao encontrado");
    }

    gerente.setEmail(gerenteOcorrencias.getEmail());
    gerente.setEndereco(gerenteOcorrencias.getEndereco());
    gerente.setNome(gerenteOcorrencias.getNome());

    gerenteOcorrenciasRepository.save(gerente);
    return ResponseEntity.status(HttpStatus.GONE).body(gerente);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> apagarGerente(@PathVariable Long id){
    try {
      gerenteOcorrenciasRepository.deleteById(id);
      return ResponseEntity.status(HttpStatus.OK).body(null);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }

  }
}
