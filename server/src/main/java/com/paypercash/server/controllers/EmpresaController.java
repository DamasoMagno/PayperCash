package com.paypercash.server.controllers;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.services.EmpresaService;

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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RequestMapping("/empresas")
@RestController
@Api(value = "Empresa")
public class EmpresaController {

	private final String errorNotFoundMessage = "Nenhuma empresa, cadastrada com este id";
	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";

	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private EmpresaService empresaServices;

	@GetMapping("/todas")
	@ApiOperation(value = "Exibir toda(s) a(s) empresa(s) registradas no sistema")
	public List<Empresa> exibirEmpresas() {
		return empresaRepository.findAll();
	}

	@GetMapping
	@ApiOperation(value = "Exibe a empresa autenticada no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados, exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> exibirEmpresa(@RequestHeader String token) {
		System.out.println(JwtUtil.decodeJWT(token));
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Empresa empresa = empresaServices.obterEmpresaPeloId(userId);
			return ResponseEntity.status(HttpStatus.OK).body(empresa);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}

	}

	@PostMapping
	@ApiOperation(value = "Essa rota, realiza o cadastro da empresa no sistema")
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Empresa criada com sucesso"),
			@ApiResponse(code = 400, message = "Não é possível, cadastrar mais de uma empresa no sistema"), })
	public ResponseEntity<?> criarEmpresa(@RequestBody Empresa empresa) {
		try {
			Empresa empresaCriada = empresaServices.criarEmpresa(empresa);
			return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PostMapping("/login")
	@ApiOperation(value = "Essa rota, realiza o login, mantendo assim a empresa, autenticada no sistema")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Autenticação, realizada com sucesso"),
			@ApiResponse(code = 404, message = "E-mail/Senha estão incorretos"), })
	public ResponseEntity<?> autenticar(@RequestBody Empresa empresa) throws Exception {
		try {
			String autenticacaoFeitaComSucesso = empresaServices.autenticar(empresa);
			return ResponseEntity.status(HttpStatus.OK).body(autenticacaoFeitaComSucesso);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PutMapping
	@ApiOperation(value = "Esta rota, tem a função de realizar a atualização dos dados, da empresa autenticada")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados atualizados com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> atualizarEmpresa(@RequestBody Empresa empresa, @RequestHeader String token)
			throws Exception {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			Empresa empresaAlterada = empresaServices.atualizarEmpresaDados(empresa, userId);
			return ResponseEntity.status(HttpStatus.OK).body(empresaAlterada);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}

	@DeleteMapping
	@ApiOperation(value = "Esta rota, tem a função de remover do sistema, a empresa autenticada.")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Dados removidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 404, message = errorNotFoundMessage), })
	public ResponseEntity<?> apagarEmpresa(@RequestHeader String token) {
		try {
			Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
			empresaRepository.deleteById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorNotFoundMessage);
		}
	}
}
