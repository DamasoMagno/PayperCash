package com.paypercash.server.services;

import javax.naming.NoPermissionException;
import javax.naming.directory.AttributeInUseException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.enums.Perfil;
import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.TecnicoRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;

@Service
public class TecnicoService extends handlerErrors {

	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private EmpresaService empresaService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public String erroNaoEncontrado(String entidade) {
		return entidade + " não encontrad" + entidade.charAt(entidade.length() - 1);
	}
	
	public Tecnico obterTecnicoPeloEmail(String email) {
		return tecnicoRepository.findByEmail(email);
	}

	public Tecnico obterTecnicoPeloId(Long id) {
		return tecnicoRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(erroNaoEncontrado("Tecnico")));
	}
	
	public Tecnico criarTecnico(Tecnico tecnico, Claims token) throws Exception {
		Object role = token.get("roles");
		
		if(!role.equals("EMPRESA")) {
			throw new NoPermissionException(errorNotFoundMessage);
		}
		
		Tecnico tecnicoJaExiste = tecnicoRepository.findByEmail(tecnico.getEmail());

		if (tecnicoJaExiste != null) {
			throw new EntityExistsException("Esta conta, já está cadastrada no sistema");
		}
		
		Empresa empresa = empresaService.obterEmpresaPeloId(Long.parseLong(token.getSubject()));
		tecnico.setEmpresa(empresa);
		tecnico.setSenha(passwordEncoder.encode(tecnico.getSenha()));

		Tecnico novoTecnico = tecnicoRepository.save(tecnico);
		return novoTecnico;
	}

	public Tecnico atualizarTecnico(Tecnico tecnico, Long userId) throws Exception {
		Tecnico tecnicoEncontrado = obterTecnicoPeloId(userId);
		
		if (tecnico.getEmail() != null) {
			tecnicoEncontrado.setEmail(tecnico.getEmail());
		}
		
		if (tecnico.getNome() != null) {
			tecnicoEncontrado.setNome(tecnico.getNome());
		}
		
		Tecnico novoTecnico = tecnicoRepository.save(tecnicoEncontrado);
		return novoTecnico;
	}

	public String autenticar(Tecnico tecnico) throws Exception {
		Tecnico tecnicoExiste = tecnicoRepository.findByEmail(tecnico.getEmail());

		if (tecnicoExiste == null)
			throw new BadCredentialsException(errorCredentialsIncorrect);

		boolean passwordIsValid = passwordEncoder.matches(tecnico.getSenha(), tecnicoExiste.getSenha());

		if (passwordIsValid == false)
			throw new BadCredentialsException(errorCredentialsIncorrect);

		return JwtUtil.createJWT("213123", "Damaso Magno Lima", tecnicoExiste.getId().toString(), Perfil.TECNICO, 120000);
	}
	
	public void atualizarSenha(Tecnico tecnico) throws Exception {
		Tecnico tecnicoEncontrado = obterTecnicoPeloEmail(tecnico.getEmail());
		
		if(tecnicoEncontrado == null) {
			throw new EntityNotFoundException(erroNaoEncontrado("Tecnico"));
		}

		if(tecnico.getSenha() == "" || tecnico.getSenha() == null) {
			throw new Exception("Senha inválida");
		}
		
        boolean senhaIgual = passwordEncoder.matches(tecnico.getSenha(), tecnicoEncontrado.getSenha());
		
		if(senhaIgual) {
			throw new AttributeInUseException("Esta senha já está em uso");
		}
		
		tecnicoEncontrado.setSenha(passwordEncoder.encode(tecnico.getSenha()));
		tecnicoRepository.save(tecnicoEncontrado);
	}

	public void removerTecnico(Claims token, Long id) throws Exception {
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		Tecnico tecnicoEncontrado = obterTecnicoPeloId(id);
		
		if(tecnicoEncontrado == null) {
			throw new EmptyResultDataAccessException("Tecnico removido do sistema", 0, null);
		}
		
		tecnicoRepository.deleteById(id);
	}
}
