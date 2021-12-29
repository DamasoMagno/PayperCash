  package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.services.GerenteOcorrenciasService;

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
  private GerenteOcorrenciasService gerenteOcorrenciasServices;

  @GetMapping
  public List<GerenteOcorrencias> listarTodos(){
    return gerenteOcorrenciasRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> listarGerente(@PathVariable Long id){
    try {
    	GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasRepository.findById(id).get();
    	return ResponseEntity.status(HttpStatus.FOUND).body(gerenteEncontrado);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Nenhum gerente encontrado no sistema");
	}
  }
  
  @PostMapping
  public ResponseEntity<?> criarGerente( @RequestBody GerenteOcorrencias gerenteOcorrencias){
    try {
      GerenteOcorrencias novoGerente = gerenteOcorrenciasServices.criarGerente(gerenteOcorrencias);
      return ResponseEntity.status(HttpStatus.CREATED).body(novoGerente);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> atualizarDados( @RequestBody GerenteOcorrencias gerenteOcorrencias, @PathVariable Long id){
    try {
    	GerenteOcorrencias gerenteAtualizaado = gerenteOcorrenciasServices.atualizarGerente(gerenteOcorrencias, id);
    	return ResponseEntity.status(HttpStatus.GONE).body(gerenteAtualizaado);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: Não foi possível atualizar esse gerente");
	}
    
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
