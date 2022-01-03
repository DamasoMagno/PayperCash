package com.paypercash.server.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.GerenteOcorrenciasService;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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

	private final String errorNotFoundMessage = "Nenhum gerente, cadastrada com este id";
	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";

	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private GerenteOcorrenciasService gerenteOcorrenciasServices;

	@GetMapping("/todos")
	@ApiOperation(value = "Essa rota, exibe todo(s) o(s) gerente(s) registrado(s) no sistema")
	public List<GerenteOcorrencias> listarTodos() {
		return gerenteOcorrenciasRepository.findAll();
	}

	@GetMapping
	@ApiOperation(value = "Esta rota, exibe os dados do gerente autenticado")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> listarGerente(@RequestHeader String token) {	
		System.out.print(token);
		try {
			GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasRepository
					.findById(Long.parseLong(JwtUtil.decodeJWT(token).getSubject())).get();
			return ResponseEntity.status(HttpStatus.OK).body(gerenteEncontrado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "Esta rota, realiza a autenticação de um gerente, antes deslogado do sistema")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Autenticação, realizada com sucesso"),
			@ApiResponse(code = 404, message = "E-mail/Senha estão incorretos"),
	})
	public ResponseEntity<?> autenticar(@RequestBody GerenteOcorrencias gerente) throws Exception {
		try {
			String autenticacaoFeitaComSucesso = gerenteOcorrenciasServices.autenticar(gerente);
			return ResponseEntity.status(HttpStatus.OK).body(autenticacaoFeitaComSucesso);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PostMapping
	@ApiOperation(value = "Esta rota, realiza o cadasro de um novo gerente, ao sistema.")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Gerente criado com sucesso"),
			@ApiResponse(code = 400, message = "Não é possível cadastrar, tecnicos com o mesmo email"),
			@ApiResponse(code = 404, message = "Não é possivel cadastrar sem uma empresa exisente" )
	})
	public ResponseEntity<?> criarGerente(@RequestBody GerenteOcorrencias gerenteOcorrencias) {
		try {
			GerenteOcorrencias novoGerente = gerenteOcorrenciasServices.criarGerente(gerenteOcorrencias);
			return ResponseEntity.status(HttpStatus.CREATED).body(novoGerente);
		} catch (Exception e) {
			if(e.getMessage().contains("dois gerentes")) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping
	@ApiOperation(value = "Esta rota, realiza a atualização dos dados do gerente autenticado.")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados atualizados com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> atualizarDados(@RequestBody GerenteOcorrencias gerenteOcorrencias,
			@RequestHeader String token) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			GerenteOcorrencias gerenteAtualizaado = gerenteOcorrenciasServices.atualizarGerente(gerenteOcorrencias,
					userId);
			return ResponseEntity.status(HttpStatus.OK).body(gerenteAtualizaado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}

	}

	@DeleteMapping
	@ApiOperation(value = "Esta rota, realiza a deleção do gerente autenticado.")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados removidos com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> apagarGerente(@RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			gerenteOcorrenciasRepository.deleteById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}

	}
}
