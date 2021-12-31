package com.paypercash.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.security.JwtUtil;

@Service
public class GerenteOcorrenciasService {
	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public GerenteOcorrencias criarGerente(GerenteOcorrencias gerenteOcorrencias) throws Exception {
		List<Empresa> empresas = empresaRepository.findAll();
		if(empresas.get(0) == null) throw new Exception("Não é possivel cadastrar sem uma empresa exisente");
		gerenteOcorrencias.setEmpresa(empresas.get(0));
		gerenteOcorrencias.setSenha(passwordEncoder.encode(gerenteOcorrencias.getSenha()));
		GerenteOcorrencias novoGerente = gerenteOcorrenciasRepository.save(gerenteOcorrencias);
		return novoGerente;
	}

	public String autenticar(GerenteOcorrencias gerente) throws Exception {
		GerenteOcorrencias gerenteExiste = gerenteOcorrenciasRepository.findByEmail(gerente.getEmail());
		if(gerenteExiste == null) throw new Exception("Email/Senha incorreta");
		boolean passwordIsValid = passwordEncoder.matches(gerente.getSenha(), gerenteExiste.getSenha());
		if(passwordIsValid == false ) throw new Exception("Email/Senha está icorreta");
		return JwtUtil.createJWT("213123", "Damaso Magno Lima", gerenteExiste.getId().toString(), 60000);
	}
	
	public GerenteOcorrencias atualizarGerente(GerenteOcorrencias gerenteOcorrencias, Long id) throws Exception  {
		GerenteOcorrencias gerente = gerenteOcorrenciasRepository.findById(id).get();
		if(gerente == null) throw new Exception("Gerente não encontrado");
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
