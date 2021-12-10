package com.paypercash.server.controllers;

import java.util.List;

import com.paypercash.server.models.Tecnico;
import com.paypercash.server.models.Empresa;

import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.services.TecnicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  private EmpresaRepository empresaRepository;

  @Autowired
  private TecnicoService tecnicoService;

  @GetMapping
  public List<Tecnico> getTechnicians(){
    List<Tecnico> tecnicos = tecnicoRepository.findAll();
    return tecnicos;
  }

  @GetMapping("/{id}")
  public Tecnico getTechnician(@PathVariable Long id){
    Tecnico tecnicoEncontrado = tecnicoRepository.findById(id).get(); 
    return tecnicoEncontrado;
  }

  @PostMapping("/{id}")
  public ResponseEntity<?> saveTechnician(@PathVariable Long id, @RequestBody Tecnico tecnico){
    Empresa empresa = empresaRepository.findById(id).get();
    tecnico.setEmpresa(empresa);
    Tecnico tec = tecnicoRepository.save(tecnico); 
    return ResponseEntity.status(HttpStatus.CREATED).body(tec);
  }

  @DeleteMapping("/{id}")
  public void apagarTecnico(@PathVariable Long id){
    tecnicoRepository.deleteById(id);
  }

  @PutMapping("/{id}")
  public Tecnico atualizarInformacoes(@RequestBody Tecnico tecnico, @PathVariable Long id){
    
    Tecnico novoTecnico = tecnicoService.atualizarTecnico(tecnico, id);

    Tecnico tec = tecnicoRepository.save(novoTecnico);

    return tec;
  }

}
