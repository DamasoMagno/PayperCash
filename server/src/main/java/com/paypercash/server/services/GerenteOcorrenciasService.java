package com.paypercash.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;

@Service
public class GerenteOcorrenciasService {
	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public GerenteOcorrencias criarGerente(GerenteOcorrencias gerenteOcorrencias) {
		List<Empresa> empresas = empresaRepository.findAll();
		gerenteOcorrencias.setEmpresa(empresas.get(0));
		gerenteOcorrencias.setSenha(passwordEncoder.encode(gerenteOcorrencias.getSenha()));
		GerenteOcorrencias novoGerente = gerenteOcorrenciasRepository.save(gerenteOcorrencias);
		return novoGerente;
	}

	public GerenteOcorrencias atualizarGerente(GerenteOcorrencias gerenteOcorrencias, Long id) {
		GerenteOcorrencias gerente = gerenteOcorrenciasRepository.findById(id).get();
		
		if(gerente == null){
			throw new Error("Gerente não encontrado");
		}
		
		if(gerente.getEmail() != null ) {
			gerente.setEmail(gerenteOcorrencias.getEmail());
		}
		
		if(gerente.getEndereco() != null) {
			gerente.setEndereco(gerenteOcorrencias.getEndereco());
		}
		
		if(gerente.getNome() != null ) {
			gerente.setNome(gerenteOcorrencias.getNome());
		}
		
		if(gerente.getSenha() != null ) {
			gerente.setSenha(passwordEncoder.encode(gerente.getSenha()));
		}
		
		GerenteOcorrencias gerenteAtualizado = gerenteOcorrenciasRepository.save(gerente);
		return gerenteAtualizado;
	}
}
