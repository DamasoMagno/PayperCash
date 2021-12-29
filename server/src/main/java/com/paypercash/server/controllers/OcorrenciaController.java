package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.services.OcorrenciaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ocurrencies")
public class OcorrenciaController {

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	@Autowired
	private OcorrenciaService ocorrenciaService;

	@GetMapping
	public List<Ocorrencia> listarOcorrencias(){
		return ocorrenciaRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> obterOcorrencia(@PathVariable Long id){
		try {
			Ocorrencia ocorrenciaEncontrada = ocorrenciaService.obterOcorrencia(id);
			return ResponseEntity.status(HttpStatus.FOUND).body(ocorrenciaEncontrada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
		}
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> criarOcorrencia( @RequestBody Ocorrencia ocorrencia, @PathVariable Long id){ 
		try {
			Ocorrencia ocorrenciaCriada = ocorrenciaService.criarOcorrencia(ocorrencia, id);
			return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaCriada);
		} catch (Exception error){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + error.getMessage());
		}
	}

	@PutMapping("finalizar/{id}")
	public ResponseEntity<?> finalizarOcorrencia(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia){ 
		try {
			Ocorrencia ocorrenciaAtualizada = ocorrenciaService.finalizarOcorrencia(ocorrencia, id);
			return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaAtualizada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro" + e.getMessage());
		}
	}

	@PutMapping("atender/{id}")
	public ResponseEntity<?> prestarSuporteOcorrencia(@PathVariable Long id, @RequestBody Tecnico tecnico){
		try {
			Ocorrencia ocorrenciaNaoPendente = ocorrenciaService.atenderOcorrencia(id, tecnico);
			return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaNaoPendente);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerOcorrencia(@PathVariable Long id){
		try {
			ocorrenciaRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Nenhuma ocorrencia encontrada");
		}
	}
}
