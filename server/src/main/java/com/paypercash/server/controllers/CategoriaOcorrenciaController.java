package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
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
@RequestMapping("/categorias")
@Api(value = "Categoria")
public class CategoriaOcorrenciaController {

	private final String errorNotFoundMessage = "Nenhuma categoria, cadastrada com este id";
	
	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;

	@GetMapping
	@ApiOperation(value = "Esta rota, exibe todas as categorias cadastradas")
	public List<CategoriaOcorrencia> listarCategorias() {
		return categoriaOcorrenciaRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Esta rota, exibe determinda categoria com base em seu id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso" ),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> listarCategoria(@PathVariable Long id) {
		try {
			CategoriaOcorrencia categoriaEncontrada = categoriaOcorrenciaRepository.findById(id).get();
			return ResponseEntity.status(HttpStatus.OK).body(categoriaEncontrada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@PostMapping
	@ApiOperation(value = "Essa rota, realiza o cadastro de uma nova categoria no sistema")
	@ApiResponses(value = {
			@ApiResponse(code = 201, message = "Tecnico criado com sucesso"),
			@ApiResponse(code = 400, message = "Não é possível cadastrar, duas ocorrencias iguais"),
	})
	public ResponseEntity<?> criarCategoria(@RequestBody CategoriaOcorrencia categoriaOcorrencia) {
		CategoriaOcorrencia categoriaJaExiste = categoriaOcorrenciaRepository.findByNome(categoriaOcorrencia.getNome());
		
		if (categoriaJaExiste != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Não é possível cadastrar, duas ocorrencias iguais");
		}
		
		CategoriaOcorrencia novaCategoria = categoriaOcorrenciaRepository.save(categoriaOcorrencia);
		return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "Esta rota, realiza a deleção de uma categoria com base em seu id, do sistema")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados removidos com sucesso" ),
			@ApiResponse(code = 404, message = errorNotFoundMessage )
	})
	public ResponseEntity<?> removeCategoria(@PathVariable Long id) throws JSONException {
		try {
			categoriaOcorrenciaRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (Exception e) {			
		    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}
}
