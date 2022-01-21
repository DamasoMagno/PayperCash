package com.paypercash.server.controllers;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.services.EmpresaService;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.security.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.naming.directory.AttributeInUseException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
	
@RequestMapping("/empresas")
@RestController
@Api(value = "Empresa")
public class EmpresaController extends handlerErrors {

	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private EmpresaService empresaServices;
	
	@GetMapping("/todas")
	@ApiOperation(value = "Exibe a(s) empresa(s) cadastradas no sistema")
	@ResponseStatus(code = HttpStatus.OK)
	public List<Empresa> exibirEmpresas() {
		return empresaRepository.findAll();
	}
	

	@GetMapping
	@ApiOperation(value = "Exibe a empresa autenticada no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = "Empresa nao encontrada"), 
	})
	public ResponseEntity<?> exibirEmpresa(HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			Empresa empresa = empresaServices.obterEmpresaPeloId(userId);
			return ResponseEntity.ok().body(empresa);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}

	}
	

	@PostMapping
	@ApiOperation(value = "Realiza o cadastro da empresa no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 201, message = "Empresa criada com sucesso"),
			@ApiResponse(code = 400, message = "Não é possível, cadastrar mais de uma empresa no sistema"), 
	})
	public ResponseEntity<?> criarEmpresa(@RequestBody Empresa empresa) throws Exception {
		try {
			Empresa empresaCriada = empresaServices.criarEmpresa(empresa);
			return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
		} catch (EntityExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	

	@PostMapping("/login")
	@ApiOperation(value = "Realiza a autenticação da empresa no sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Autenticação, realizada com sucesso"),
			@ApiResponse(code = 404, message = errorCredentialsIncorrect), 
	})
	@ResponseStatus
	public ResponseEntity<?> autenticar(@RequestBody Empresa empresa) throws Exception {
		try {
			String autenticacaoFeitaComSucesso = empresaServices.autenticar(empresa);
			return ResponseEntity.status(HttpStatus.OK).body(autenticacaoFeitaComSucesso);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	
	@PutMapping
	@ApiOperation(value = "Atualiza os dados da empresa autenticada")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados atualizados com sucesso"),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
	})
	public ResponseEntity<?> atualizarEmpresa(@RequestBody Empresa empresa, HttpServletRequest request) throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());
			Empresa empresaAlterada = empresaServices.atualizarEmpresaDados(empresa, userId);
			return ResponseEntity.status(HttpStatus.OK).body(empresaAlterada);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@ApiOperation(value = "Atualiza a senha da empresa autenticada")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = sucessoAtualizaoSenha),
			@ApiResponse(code = 400, message = "Senha já em uso"),
			@ApiResponse(code = 404, message = errorNotFoundMessage), 
			@ApiResponse(code = 400, message = errorInvalidPassword),
	})
	@PutMapping("/resetar")
	public ResponseEntity<?> resetarSenhaEmpresa(@RequestBody Empresa empresa) throws Exception {
		try {
			empresaServices.atualizarSenha(empresa);
			return ResponseEntity.ok().build();
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (AttributeInUseException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	
	@DeleteMapping
	@ApiOperation(value = "Remove a empresa autenticada do sistema")
	@ApiResponses(value = { 
			@ApiResponse(code = 200, message = "Dados removidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage), 
			@ApiResponse(code = 410, message = "Empresa já removida"),
	})
	public ResponseEntity<?> apagarEmpresa(HttpServletRequest request) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(request).getSubject());;
			empresaRepository.deleteById(userId);
			return ResponseEntity.ok().build();
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.GONE).body("Empresa já removida");
		} 
	}
}
