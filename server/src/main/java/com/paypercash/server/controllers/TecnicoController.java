package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.Tecnico;

import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.services.TecnicoService;

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

@RequestMapping("/technicians")
@RestController
public class TecnicoController {

	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private TecnicoService tecnicoService;

	@GetMapping
	public List<Tecnico> listaTecnicos(){
		return tecnicoRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> obterTecnico(@PathVariable Long id){
		try {
			Tecnico tecnicoEncontrado = tecnicoService.obterTecnicoPeloId(id);
			return ResponseEntity.status(HttpStatus.OK).body(tecnicoEncontrado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Não foi possivel encontrar este tecnico");
		} 
	}

	@PostMapping
	public ResponseEntity<?> criarTecnico(@PathVariable Long id, @RequestBody Tecnico tecnico){
		try {
			Tecnico novoTecnico = tecnicoService.criarTecnico(tecnico, id); 
			return ResponseEntity.status(HttpStatus.CREATED).body(novoTecnico);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> fazerAutenticacao(@RequestBody Tecnico tecnico){
		try {
			String autenticacaoFeitaComSucesso = tecnicoService.autenticar(tecnico);
			return ResponseEntity.status(HttpStatus.CREATED).body(autenticacaoFeitaComSucesso);
		} catch (Exception e) {
			return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> apagarTecnico(@PathVariable Long id){
		try {
			tecnicoRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Não foi possivel remover o tecnico do banco");
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarInformacoes(@RequestBody Tecnico tecnico, @PathVariable Long id){
		try {
			Tecnico novoTecnico = tecnicoService.atualizarTecnico(tecnico, id);
			return ResponseEntity.status(HttpStatus.CREATED).body(novoTecnico);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("awdwd");
		}
	}

}
