package com.paypercash.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.security.JwtUtil;

@Service
public class TecnicoService {

	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private EmpresaService empresaService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public Tecnico obterTecnicoPeloEmail(String email){
		return tecnicoRepository.findByEmail(email);
	}

	public Tecnico obterTecnicoPeloId(Long id){
		return tecnicoRepository.findById(id).get();
	}

	public Tecnico criarTecnico(Tecnico tecnico, Long id) throws Exception {
		Tecnico tecnicoJaExiste = tecnicoRepository.findByEmail(tecnico.getEmail());
		if(tecnicoJaExiste != null) {
			throw new Exception("Esta conta, já está cadastrada no sistema");
		}
		Empresa empresa = empresaService.obterEmpresaPeloId(id);
		tecnico.setEmpresa(empresa);
		tecnico.setSenha(passwordEncoder.encode(tecnico.getSenha()));
		Tecnico novoTecnico = tecnicoRepository.save(tecnico);
		return novoTecnico;
	}

	public Tecnico atualizarTecnico(Tecnico tecnico, Long id){
		Tecnico tecnicoEncontrado = obterTecnicoPeloId(tecnico.getId());

		if(tecnicoEncontrado == null){
			throw new Error("Nenhum tecnico encontrado");
		}

		if(tecnico.getEmail() != null){
			tecnicoEncontrado.setEmail(tecnico.getEmail());
		} 

		if(tecnico.getNome() != null){
			tecnicoEncontrado.setNome(tecnico.getNome());
		}

		if(tecnico.getSenha() != null){
			tecnicoEncontrado.setSenha(passwordEncoder.encode(tecnico.getSenha()));
		}

		Tecnico novoTecnico = tecnicoRepository.save(tecnicoEncontrado);
		return novoTecnico;
	}

	public String autenticar(Tecnico tecnico) throws Exception {
		Tecnico tecnicoExiste = tecnicoRepository.findByEmail(tecnico.getEmail());
		if(tecnicoExiste == null) throw new Exception("Email/Senha incorreta");
		boolean passwordIsValid = passwordEncoder.matches(tecnico.getSenha(), tecnicoExiste.getSenha());
		if(passwordIsValid == false ) throw new Exception("Email/Senha está icorreta");
		return JwtUtil.createJWT("213123", "Damaso Magno Lima", tecnicoExiste.getId().toString(), 60000);
	}
}
