package com.paypercash.server.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.naming.NoPermissionException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import com.paypercash.server.dtos.OcorrenciaDTO;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.OcorrenciaService;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
@RequestMapping("/ocorrencias")
public class OcorrenciaController extends handlerErrors{

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	@Autowired
	private OcorrenciaService ocorrenciaService;

	@GetMapping
	@ApiOperation(value = "Exibe todas as ocorrencias castradas no sistema")
	public List<OcorrenciaDTO> listarOcorrencias() {
		return ocorrenciaRepository.findAll().stream()
				.map(x -> new OcorrenciaDTO(x)).collect(Collectors.toList());
	}
	

	@GetMapping("/{id}")
	@ApiOperation(value = "Exibe uma ocorrencia, baseada em seu id")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> obterOcorrencia(@PathVariable Long id) {
		try {
			Ocorrencia ocorrenciaEncontrada = ocorrenciaService.obterOcorrencia(id);
			OcorrenciaDTO ocorrenciaFormatada = new OcorrenciaDTO(ocorrenciaEncontrada);
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaFormatada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	

	@PostMapping
	@ApiOperation(value = "Realiza o cadastro de uma nova ocorrência no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
			@ApiResponse(code = 400, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> criarOcorrencia(@RequestBody Ocorrencia ocorrencia, HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			OcorrenciaDTO ocorrenciaCriada = new OcorrenciaDTO(ocorrenciaService.criarOcorrencia(ocorrencia, userId));
			return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaCriada);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (Exception error) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
		}
	}
	

	@PutMapping("finalizar/{id}")
	@ApiOperation(value = "Recebe a resolução da ocorrencia, indicando que ela foi finalizada")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> finalizarOcorrencia(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia) throws Exception {
		try {
			OcorrenciaDTO ocorrenciaAtualizada = new OcorrenciaDTO(ocorrenciaService.finalizarOcorrencia(ocorrencia, id));
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaAtualizada);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	

	@PutMapping("direcionar/{id}")
	@ApiOperation(value = "Direciona uma ocorrencia a determinado técnico, através do seu email")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage), 
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage),
			@ApiResponse(code = 400, message = "Ocorrencia já direcionada a outro técnico"),
	})
	public ResponseEntity<?> direcionarOcorrencia(@PathVariable Long id, HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			OcorrenciaDTO ocorrenciaNaoPendente = new OcorrenciaDTO(ocorrenciaService.direcionarOcorrencia(id, userId));
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaNaoPendente);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}  catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}  
	}
	

	@DeleteMapping("/{id}")
	@ApiOperation(value = "Realiza a remoção da ocorrencia cadastrada com esse id.")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 403, message = errorNotPermission), 
	})
	public ResponseEntity<?> removerOcorrencia(HttpServletRequest request, @PathVariable Long id) {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			ocorrenciaService.removerCategoria(token, id);
			return ResponseEntity.ok().build();
		} catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.GONE).body(e.getMessage());
		}
	}
}
