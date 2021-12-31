  package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.GerenteOcorrenciasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/gerente")
@RestController
public class GerenteOcorrenciasController {
  
  @Autowired
  private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
  @Autowired
  private GerenteOcorrenciasService gerenteOcorrenciasServices;

  @GetMapping("/todos")
  public List<GerenteOcorrencias> listarTodos(){
    return gerenteOcorrenciasRepository.findAll();
  }

  @GetMapping
  public ResponseEntity<?> listarGerente(@RequestHeader String token){
    try {
    	GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasRepository.findById(Long.parseLong(JwtUtil.decodeJWT(token).getSubject())).get();
    	return ResponseEntity.status(HttpStatus.FOUND).body(gerenteEncontrado);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Nenhum gerente encontrado no sistema");
	}
  }
  
  @PostMapping("/login")
  public ResponseEntity<?> autenticar(@RequestBody GerenteOcorrencias gerente){
	  try {
		String autenticacaoFeitaComSucesso = gerenteOcorrenciasServices.autenticar(gerente);
		return ResponseEntity.status(HttpStatus.CREATED).body(autenticacaoFeitaComSucesso);
	} catch (Exception e) {
		return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.NOT_FOUND);
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

  @PutMapping
  public ResponseEntity<?> atualizarDados( @RequestBody GerenteOcorrencias gerenteOcorrencias, @RequestHeader String token){  
    try {
    	Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
    	GerenteOcorrencias gerenteAtualizaado = gerenteOcorrenciasServices.atualizarGerente(gerenteOcorrencias, userId);
    	return ResponseEntity.status(HttpStatus.GONE).body(gerenteAtualizaado);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: Não foi possível atualizar esse gerente");
	}
    
  }
  
  @DeleteMapping
  public ResponseEntity<?> apagarGerente(@RequestHeader String token){
    try {
    	Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
      gerenteOcorrenciasRepository.deleteById(userId);
      return ResponseEntity.status(HttpStatus.OK).body(null);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }

  }
}
