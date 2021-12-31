package com.paypercash.server.controllers;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.services.EmpresaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.security.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/empresas")
@RestController
@Api(value = "Empresa")
public class EmpresaController {

  @Autowired
  private EmpresaRepository empresaRepository;
  @Autowired
  private EmpresaService empresaServices;

  @GetMapping("/todas")
  @ApiOperation(value = "Essa rota, tem a função de exibir toda(s) a(s) emprsa(s) registradas no sistema")
  public List<Empresa> exibirEmpresas(){
    return empresaRepository.findAll();
  }

  @GetMapping
  @ApiOperation(value = "Exibe uma determinada empresa, com base em seu id")
  @ApiResponses(value = {
		  @ApiResponse(code = 200, message="Empresa encontrada"),
		  @ApiResponse(code=404, message="Nenhuma empresa, encontrada no sistema")
  })
  public ResponseEntity<?> exibirEmpresa(@RequestHeader String token){
    try {
    Long userId = Long.parseLong(JwtUtil.decodeJWT(token).getSubject());
      Empresa empresa = empresaServices.obterEmpresaPeloId(userId);
      return ResponseEntity.status(HttpStatus.OK).body(empresa);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @PostMapping
  @ApiOperation(value="Essa rota, tem como função, realizar o cadastro da empresa no sistema")
  @ApiResponses(value= {
		  @ApiResponse(code=201, message = "Empresa Criada com Sucesso"),
		  @ApiResponse(code=404, message = "Empresa, já está cadastrada no sistema"),
  })
  public ResponseEntity<?> criarEmpresa(@RequestBody Empresa empresa){
    try {
      Empresa empresaCriada = empresaServices.criarEmpresa(empresa); 
      return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }
  }  
  
  @PostMapping("/login")
  public ResponseEntity<?> autenticar(@RequestBody Empresa empresa){
	  try {
		String autenticacaoFeitaComSucesso = empresaServices.autenticar(empresa);
		return ResponseEntity.status(HttpStatus.CREATED).body(autenticacaoFeitaComSucesso);
	} catch (Exception e) {
		return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.NOT_FOUND);
	}
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value="Esta rota, tem a função de remover do sistema, a empresa cadastrada nele")
  @ApiResponses(value = {
		  @ApiResponse(code = 410, message = "Empresa removida, com sucesso")
  })
  public ResponseEntity<?> apagarEmpresa(@PathVariable Long id){
    try {
      empresaRepository.deleteById(id);
      return ResponseEntity.status(HttpStatus.GONE).body(null);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Esta empresa, não foi encontrada");
    }
  }

  @PutMapping("/{id}")
  @ApiOperation(value="Esta rota, tem a função de realizar a atualizção dos dados cadastradosa respeito da empresa")
  public ResponseEntity<?> atualizarEmpresa(@RequestBody Empresa empresa, @PathVariable Long id){
    try {
      Empresa empresaAlterada = empresaServices.atualizarEmpresaDados(empresa, id);
      return ResponseEntity.status(HttpStatus.CREATED).body(empresaAlterada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Não foi possivel, atualizar os dados");
    }
  }
}
