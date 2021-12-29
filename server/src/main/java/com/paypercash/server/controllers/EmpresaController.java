package com.paypercash.server.controllers;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.services.EmpresaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import com.paypercash.server.repository.EmpresaRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/enterprises")
@RestController
@Api(value = "Empresa")
public class EmpresaController {

  @Autowired
  private EmpresaRepository empresaRepository;
  @Autowired
  private EmpresaService empresaServices;

  @GetMapping
  @ApiOperation(value = "Lista todas as empresas")
  public List<Empresa> exibirEmpresas(){
    return empresaRepository.findAll();
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "Exibe uma determinada empresa, com base em seu id")
  public ResponseEntity<?> exibirEmpresa(@PathVariable Long id){
    try {
      Empresa empresa = empresaServices.obterEmpresaPeloId(id);
      return ResponseEntity.status(HttpStatus.OK).body(empresa);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @PostMapping
  public ResponseEntity<?> criarEmpresa(@RequestBody Empresa empresa){
    try {
      Empresa empresaCriada = empresaServices.criarEmpresa(empresa); 
      return ResponseEntity.status(HttpStatus.CREATED).body(empresaCriada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: " + e.getMessage());
    }
  }  

  @DeleteMapping("/{id}")
  public ResponseEntity<?> apagarEmpresa(@PathVariable Long id){
    try {
      empresaRepository.deleteById(id);
      return ResponseEntity.status(HttpStatus.GONE).body(null);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Esta empresa, não foi encontrada");
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> atualizarEmpresa(@RequestBody Empresa empresa, @PathVariable Long id){
    try {
      Empresa empresaAlterada = empresaServices.atualizarEmpresaDados(empresa, id);
      return ResponseEntity.status(HttpStatus.CREATED).body(empresaAlterada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Não foi possivel, atualizar os dados");
    }
  }
}
