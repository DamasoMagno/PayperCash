package com.paypercash.server.controllers;

import java.util.List;

import javax.naming.NoPermissionException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.server.services.CategoriaOcorrenciaService;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
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
public class CategoriaOcorrenciaController extends handlerErrors {

	private final String errorUnauthorizedessage = "Refaça seu login, para visualizar seus dados ";
	private final String errorNotFoundMessage = "Nenhuma categoria, cadastrada com este id";
	
	@Autowired
	private CategoriaOcorrenciaService categoriaOcorrenciaService;

	@GetMapping("/todas")
	@ApiOperation(value = "Exibe todas as categorias cadastradas")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = errorNotPermission),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
	})
	public ResponseEntity<?> listarCategorias(HttpServletRequest request) {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			List<CategoriaOcorrencia> categorias = categoriaOcorrenciaService.exibirTodasAsCategorias(token);
			return ResponseEntity.status(HttpStatus.OK).body(categorias);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		}  catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		}  catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "Exibe a categoria cadastrada com esse id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Dados exibidos com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = errorNotPermission),
			@ApiResponse(code = 404, message = errorNotFoundMessage),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
	})
	public ResponseEntity<?> listarCategoria(HttpServletRequest request, @PathVariable Long id) {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			CategoriaOcorrencia categoriaEncontrada = categoriaOcorrenciaService.exibirCategoria(token, id);
			return ResponseEntity.status(HttpStatus.OK).body(categoriaEncontrada);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		}  catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		}  catch (NoPermissionException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PostMapping
	@ApiOperation(value = "Realiza o cadastro de uma nova categoria no sistema")
	@ApiResponses(value = {
			@ApiResponse(code = 201, message = "Categoria criada com sucesso"),
			@ApiResponse(code = 400, message = "Não é possível cadastrar duas ocorrencias iguais"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = errorNotPermission),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
	})
	public ResponseEntity<?> criarCategoria(
			HttpServletRequest request, 
			@RequestBody CategoriaOcorrencia categoriaOcorrencia
	) throws NoPermissionException {
		try {
			Claims token = JwtUtil.decodeJWT(request);
			CategoriaOcorrencia novaCategoria = categoriaOcorrenciaService.criarCatgoria(categoriaOcorrencia, token);
			return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (NoPermissionException e) { 
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "Realiza a remoção da categoria cadastrada com esse id")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Categoria removida com sucesso"),
			@ApiResponse(code = 401, message = errorUnauthorizedessage),
			@ApiResponse(code = 403, message = errorNotPermission),
			@ApiResponse(code = 404, message = errorNotFoundMessage),
			@ApiResponse(code = 500, message = errorTokenNotIndentifiedMessage),
	})
	public ResponseEntity<?> removeCategoria(HttpServletRequest request, @PathVariable Long id) throws JSONException, NoPermissionException {		
		try {
			Claims token = JwtUtil.decodeJWT(request);
			categoriaOcorrenciaService.removerCategoria(token, id);
			return ResponseEntity.ok().build();
		} catch (NullPointerException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorTokenNotIndentifiedMessage);
		} catch (ExpiredJwtException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorUnauthorizedessage);
		} catch (EntityNotFoundException e) {			
		    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}
