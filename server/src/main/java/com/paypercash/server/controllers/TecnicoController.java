package com.paypercash.server.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import com.paypercash.server.models.Tecnico;

import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.TecnicoService;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/tecnicos")
@RestController
@Api(value = "Tecnico")
public class TecnicoController {

	private final String errorNotFoundMessage = "Nenhum tecnico, cadastrado com este id";
	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";

	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private TecnicoService tecnicoService;

	@GetMapping("/todos")
	@ApiOperation(value = "Essa rota, exibe todo(s) o(s) tecnico(s) registrado(s) no sistema")
	public List<Tecnico> listaTecnicos() {
		return tecnicoRepository.findAll();
	}

	@GetMapping
	@ApiOperation(value = "Essa rota, exibe os dados do técnico autenticado no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> obterTecnico(@RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Tecnico tecnicoEncontrado = tecnicoService.obterTecnicoPeloId(userId);
			return ResponseEntity.status(HttpStatus.OK).body(tecnicoEncontrado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@PostMapping
	@ApiOperation(value = "Essa rota, realiza o cadastro de um novo tecnico no sistema")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Tecnico criado com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 400, message = "Não é possível cadastrar, tecnicos com o mesmo id"), })
	public ResponseEntity<?> criarTecnico(@RequestHeader String token, @RequestBody Tecnico tecnico) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Tecnico novoTecnico = tecnicoService.criarTecnico(tecnico, userId);
			return ResponseEntity.status(HttpStatus.CREATED).body(novoTecnico);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "Essa rota, realiza o login, mantendo o tecnico autenticado no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Autenticação, realizada com sucesso"),
			@ApiResponse(code = 404, message = "E-mail/Senha estão incorretos"), })
	public ResponseEntity<?> fazerAutenticacao(@RequestBody Tecnico tecnico) throws Exception {
		try {
			String autenticacaoFeitaComSucesso = tecnicoService.autenticar(tecnico);
			return ResponseEntity.status(HttpStatus.OK).body(autenticacaoFeitaComSucesso);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping
	@ApiOperation(value = "Esta rota, tem a função de realizar a atualização dos dados do tecnico autenticado no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados atualizados com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> atualizarInformacoes(@RequestBody Tecnico tecnico, @RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Tecnico novoTecnico = tecnicoService.atualizarTecnico(tecnico, userId);
			return ResponseEntity.status(HttpStatus.OK).body(novoTecnico);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@DeleteMapping
	@ApiOperation(value = "Esta rota, tem a função de remover do sistema, o tecnico autenticado no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados removidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> apagarTecnico(@RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			tecnicoRepository.deleteById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}
}
