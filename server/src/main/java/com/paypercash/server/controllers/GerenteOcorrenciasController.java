package com.paypercash.server.controllers;

import java.util.List;

import javax.naming.NoPermissionException;
import javax.naming.directory.AttributeInUseException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.GerenteOcorrenciasService;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/gerentes")
@RestController
public class GerenteOcorrenciasController extends handlerErrors {

	private final String errorNotFoundMessage = "Nenhum gerente, cadastrada com este id";
	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";

	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private GerenteOcorrenciasService gerenteOcorrenciasServices;

	@GetMapping("/todos")
	@ApiOperation(value = "Exibe todos o gerentes cadastrados no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = errorNotPermission), 
	})
	public ResponseEntity<?> listarTodos(HttpServletRequest request) {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			List<GerenteOcorrencias> gerentes = gerenteOcorrenciasServices.exibirTodosOsGerentes(token);
			return ResponseEntity.status(HttpStatus.OK).body(gerentes);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		}  catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		}  catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
	}
	

	@GetMapping
	@ApiOperation(value = "Exibe os dados do gerente autenticado")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> listarGerente(HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasServices.obterGerente(userId);		
			return ResponseEntity.status(HttpStatus.OK).body(gerenteEncontrado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	
	@GetMapping("/{id}")
	@ApiOperation(value = "Exibe os dados do gerente cadastrado com esse id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
			@ApiResponse(code = 403, message = errorNotPermission), 
	})
	public ResponseEntity<?> listarGerente(HttpServletRequest request, @PathVariable Long id) throws Exception {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasServices.amostrarGerenteEspecifico(id, token);	
			return ResponseEntity.status(HttpStatus.OK).body(gerenteEncontrado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
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
	public ResponseEntity<?> criarGerente(@RequestBody GerenteOcorrencias gerenteOcorrencias) throws Exception {
		try {
			GerenteOcorrencias novoGerente = gerenteOcorrenciasServices.criarGerente(gerenteOcorrencias);
			return ResponseEntity.status(HttpStatus.CREATED).body(novoGerente);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (EntityExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
			HttpServletRequest request) throws Exception {
		try {

			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			GerenteOcorrencias gerenteAtualizaado = gerenteOcorrenciasServices.atualizarGerente(gerenteOcorrencias, userId);
			return ResponseEntity.status(HttpStatus.OK).body(gerenteAtualizaado);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}

	}
	

	@PutMapping("/resetar")
	@ApiOperation(value = "Realiza a atualização da senha do gerente.")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 400, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = "Empresa nao encontrada"), 
	})
	public ResponseEntity<?> resetarSenhaEmpresa(@RequestBody GerenteOcorrencias gerente) throws Exception {
		try {
			gerenteOcorrenciasServices.atualizarSenha(gerente);
			return ResponseEntity.ok().build();
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (AttributeInUseException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@DeleteMapping
	@ApiOperation(value = "Esta rota, realiza a deleção do gerente autenticado.")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados removidos com sucesso" ),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage ),
	})
	public ResponseEntity<?> apagarGerente(HttpServletRequest request) throws Exception {
		try {

			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			gerenteOcorrenciasRepository.deleteById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.GONE).body("Gerente já removido");
		}

	}
}
