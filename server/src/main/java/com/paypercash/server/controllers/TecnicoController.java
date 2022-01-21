package com.paypercash.server.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NoPermissionException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import com.paypercash.server.models.Tecnico;

import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.TecnicoService;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/tecnicos")
@RestController
@Api(value = "Tecnico")
public class TecnicoController extends handlerErrors {

	private final String errorNotFoundMessage = "Tecnico não encontrado";

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
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> obterTecnico(HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			Tecnico tecnicoEncontrado = tecnicoService.obterTecnicoPeloId(userId);
			return ResponseEntity.status(HttpStatus.OK).body(tecnicoEncontrado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	

	@GetMapping("/{id}")
	@ApiOperation(value = "Exibe tecnico cadastrado com esse id")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> obterOcorrencia(@PathVariable Long id) throws Exception {
		try {			
			Tecnico ocorrenciaEncontrada = tecnicoService.obterTecnicoPeloId(id);
			return ResponseEntity.status(HttpStatus.OK).body(ocorrenciaEncontrada);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	

	@PostMapping
	@ApiOperation(value = "Cadastra um novo tecnico no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 201, message = "Tecnico criado com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 400, message = "Não é possível cadastrar, tecnicos com o mesmo email"),
			@ApiResponse(code = 400, message = errorTokenNotIndentifiedMessage),
			@ApiResponse(code = 403, message = "Você não tem permissão para acessar essa rota"),
	})
	public ResponseEntity<?> criarTecnico(HttpServletRequest request, @RequestBody Tecnico tecnico) throws Exception {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			Tecnico novoTecnico = tecnicoService.criarTecnico(tecnico, token);
			return ResponseEntity.status(HttpStatus.CREATED).body(novoTecnico);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (EntityExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	

	@PostMapping("/login")
	@ApiOperation(value = "Realiza a autenticação do técnico no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Autenticado com sucesso"),
			@ApiResponse(code = 404, message = "E-mail/Senha incorreto(a)"), 
	})
	public ResponseEntity<?> fazerAutenticacao(@RequestBody Tecnico tecnico) throws Exception {
		try {
			String autenticacaoFeitaComSucesso = tecnicoService.autenticar(tecnico);
			return ResponseEntity.status(HttpStatus.OK).body(autenticacaoFeitaComSucesso);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@PutMapping
	@ApiOperation(value = "Atualiza os dados do técnico autenticado no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados atualizados com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> atualizarInformacoes(@RequestBody Tecnico tecnico, HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			Tecnico novoTecnico = tecnicoService.atualizarTecnico(tecnico, userId);
			return ResponseEntity.status(HttpStatus.OK).body(novoTecnico);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@ApiOperation(value = "Atualiza a senha do técnico")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Senha alterada com sucesso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	@PutMapping("/resetar")
	public ResponseEntity<?> resetarSenhaEmpresa(@RequestBody Tecnico tecnico) throws Exception {
		try {
			tecnicoService.atualizarSenha(tecnico);
			return ResponseEntity.noContent().build();
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@DeleteMapping("/{id}")
	@ApiOperation(value = "Remove o técnico autenticado no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados removidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = "Você não tem permissão para acessar essa rota"), 
			@ApiResponse(code = 410, message = "Tecnico removido do sistema")
	})
	public ResponseEntity<?> apagarTecnico(HttpServletRequest request, @PathVariable Long id) throws Exception {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			tecnicoService.removerTecnico(token, id);
			return ResponseEntity.ok().build();
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.GONE).body(e.getMessage());
		}
	}
}
