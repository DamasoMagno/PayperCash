package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoriaOcorrenciaController {

	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;
	
	@GetMapping
	public List<CategoriaOcorrencia> listarCategorias(){
		return categoriaOcorrenciaRepository.findAll();
	}

	@GetMapping("/{id}")
	public CategoriaOcorrencia listarCategoria(@PathVariable Long id) {
		return categoriaOcorrenciaRepository.findById(id).get();
	}
	
	@PostMapping
	public ResponseEntity<?> criarCategoria(@RequestBody CategoriaOcorrencia categoriaOcorrencia){

		CategoriaOcorrencia categoriaJaExiste = categoriaOcorrenciaRepository.findById(categoriaOcorrencia.getId())
				.orElse(null);

		if(categoriaJaExiste != null ){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Essa cateogria já existe");
		}

		CategoriaOcorrencia novaCategoria = categoriaOcorrenciaRepository.save(categoriaOcorrencia);
		return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeCategoria(@PathVariable Long id){
		try {
			categoriaOcorrenciaRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.CREATED).body("Ocorrencia removida");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
