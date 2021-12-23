package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.Tecnico;
import com.paypercash.server.models.Empresa;

import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.services.EmpresaService;
import com.paypercash.server.services.TecnicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/technicians")
@RestController
public class TecnicoController {

  @Autowired
  private TecnicoRepository tecnicoRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  private EmpresaService empresaService;

  @Autowired
  private TecnicoService tecnicoService;

  @GetMapping
  public List<Tecnico> listaTecnicos(){
    List<Tecnico> tecnicos = tecnicoRepository.findAll();
    return tecnicos;
  }

  @GetMapping("/{id}")
  public Tecnico obterTecnico(@PathVariable Long id){
    Tecnico tecnicoEncontrado = tecnicoRepository.findById(id).get(); 
    return tecnicoEncontrado;
  }

  @PostMapping("/{id}")
  public ResponseEntity<?> criarTecnico(@PathVariable Long id, @RequestBody Tecnico tecnico){
    Empresa empresa = empresaService.obterEmpresaPeloId(id);
    tecnico.setEmpresa(empresa);
    tecnico.setSenha(passwordEncoder.encode(tecnico.getSenha()));
    Tecnico tec = tecnicoRepository.save(tecnico); 
    return ResponseEntity.status(HttpStatus.CREATED).body(tec);
  }

  @DeleteMapping("/{id}")
  public void apagarTecnico(@PathVariable Long id){
    tecnicoRepository.deleteById(id);
  }

  @PutMapping
  public ResponseEntity<?> atualizarInformacoes(@RequestBody Tecnico tecnico){
    try {
      Tecnico novoTecnico = tecnicoService.atualizarTecnico(tecnico);
      Tecnico novosDados = tecnicoRepository.save(novoTecnico);
      return ResponseEntity.status(HttpStatus.CREATED).body(novosDados);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("awdwd");
    }
  }

}
