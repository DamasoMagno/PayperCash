package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.OcorrenciaService;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ocorrencias")
public class OcorrenciaController {

	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";
	private final String errorNotFoundMessage = "Nenhuma ocorrencia, cadastrada com este id";

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	@Autowired
	private OcorrenciaService ocorrenciaService;

	@GetMapping
	@ApiOperation(value = "Esta rota, exibe toda as ocorrencias castradas no sistema")
	public List<Ocorrencia> listarOcorrencias() {
		return ocorrenciaRepository.findAll();
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Esta rota, exibe determina ocorrencia, baseada em seu id")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> obterOcorrencia(@PathVariable Long id) {
		try {
			Ocorrencia ocorrenciaEncontrada = ocorrenciaService.obterOcorrencia(id);
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaEncontrada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@PostMapping
	@ApiOperation(value = "Esta rota, realiza o cadastro de uma nova oocrrencia no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
			@ApiResponse(code = 400, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> criarOcorrencia(@RequestBody Ocorrencia ocorrencia, @RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Ocorrencia ocorrenciaCriada = ocorrenciaService.criarOcorrencia(ocorrencia, userId);
			return ResponseEntity.status(HttpStatus.CREATED).body(ocorrenciaCriada);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (Exception error) {
			if (error.getMessage().contains("minuto")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error.getMessage());
		}
	}

	@PutMapping("finalizar/{id}")
	@ApiOperation(value = "Esta rota, recebe a resolução da ocorrencia, e após isso finaliza a mesma")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> finalizarOcorrencia(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia) {
		try {
			Ocorrencia ocorrenciaAtualizada = ocorrenciaService.finalizarOcorrencia(ocorrencia, id);
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaAtualizada);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping("atender/{id}")
	@ApiOperation(value = "Esta rota, direciona uma ocorrencia a determinado técnico, com base no email do mesmo e no id dela.")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> prestarSuporteOcorrencia(@PathVariable Long id, @RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Ocorrencia ocorrenciaNaoPendente = ocorrenciaService.atenderOcorrencia(id, userId);
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaNaoPendente);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "Esta rota, realiza a remoção de determina ocorencia do sistema.")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> removerOcorrencia(@PathVariable Long id) {
		try {
			ocorrenciaRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}
