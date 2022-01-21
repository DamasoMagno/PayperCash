package com.paypercash.server.services;

import java.util.List;

import javax.naming.NoPermissionException;
import javax.naming.directory.AttributeInUseException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.security.JwtUtil;

import io.jsonwebtoken.Claims;

@Service
public class GerenteOcorrenciasService {
	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public String erroNaoEncontrado(String entidade) {
		return entidade + " não encontrad" + entidade.charAt(entidade.length() - 1);
	}
	
	public GerenteOcorrencias obterGerente(Long userId) {
		return gerenteOcorrenciasRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException(erroNaoEncontrado("Gerente")));
	}
	
	public List<GerenteOcorrencias> exibirTodosOsGerentes(Claims token) throws NoPermissionException{
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			throw new NoPermissionException("Você não tem permissão para remover essa categoria");
		}
		
		return gerenteOcorrenciasRepository.findAll();
	}
	
	
	public GerenteOcorrencias criarGerente(GerenteOcorrencias gerenteOcorrencias) throws Exception {
		Empresa empresaRegistrada = empresaRepository.findAll().stream().findFirst().orElse(null);

		if (empresaRegistrada == null)
			throw new EntityNotFoundException("Não é possivel cadastrar sem uma empresa exisente");

		GerenteOcorrencias gerenteJaExiste = gerenteOcorrenciasRepository.findByEmail(gerenteOcorrencias.getEmail());

		if(gerenteJaExiste != null) {
			throw new EntityExistsException("Não é possível cadastrar dois gerentes com o mesmo email");
		}

		gerenteOcorrencias.setEmpresa(empresaRegistrada);
		gerenteOcorrencias.setSenha(passwordEncoder.encode(gerenteOcorrencias.getSenha()));

		GerenteOcorrencias novoGerente = gerenteOcorrenciasRepository.save(gerenteOcorrencias);
		return novoGerente;
	}

	public String autenticar(GerenteOcorrencias gerente) throws Exception {
		GerenteOcorrencias gerenteExiste = gerenteOcorrenciasRepository.findByEmail(gerente.getEmail());
		final String errorLoginMessage = "Email/Senha está incorreta";

		if (gerenteExiste == null)
			throw new BadCredentialsException(errorLoginMessage);

		boolean passwordIsValid = passwordEncoder.matches(gerente.getSenha(), gerenteExiste.getSenha());

		if (passwordIsValid == false)
			throw new BadCredentialsException(errorLoginMessage);

		return JwtUtil.createJWT("213123", "Damaso Magno Lima", gerenteExiste.getId().toString(), gerenteExiste.getPerfil(), 120000);
	}

	public GerenteOcorrencias atualizarGerente(GerenteOcorrencias gerenteOcorrencias, Long id) throws Exception {
		GerenteOcorrencias gerenteEncontrado = obterGerente(id);
		
		if(gerenteOcorrencias.getNome() != null) {
			gerenteEncontrado.setNome(gerenteOcorrencias.getNome());
		}
		
		if (gerenteOcorrencias.getEmail() != null) {
			gerenteEncontrado.setEmail(gerenteOcorrencias.getEmail());
		}
		
		if (gerenteOcorrencias.getEndereco() != null) {
			gerenteEncontrado.setEndereco(gerenteOcorrencias.getEndereco());
		}
		
		GerenteOcorrencias gerenteAtualizado = gerenteOcorrenciasRepository.save(gerenteEncontrado);
		return gerenteAtualizado;
	}

	public void atualizarSenha(GerenteOcorrencias gerenteOcorrencias) throws Exception {
		GerenteOcorrencias gerenteEncontrado = gerenteOcorrenciasRepository.findByEmail(gerenteOcorrencias.getEmail());
		
		if(gerenteEncontrado == null) {
			throw new EntityNotFoundException(erroNaoEncontrado("Gerente"));
		}

		if(gerenteOcorrencias.getSenha().trim() == "" || gerenteOcorrencias.getSenha() == null) {
			throw new Exception("Senha inválida");
		}
		
		boolean senhaIgual = passwordEncoder.matches(gerenteOcorrencias.getSenha(), gerenteEncontrado.getSenha());
		
		if(senhaIgual) {
			throw new AttributeInUseException("Esta senha já está em uso");
		}
		
		gerenteEncontrado.setSenha(passwordEncoder.encode(gerenteOcorrencias.getSenha()));
		gerenteOcorrenciasRepository.save(gerenteEncontrado);
	}

	public GerenteOcorrencias amostrarGerenteEspecifico(Long id, Claims token) throws NoPermissionException {
		GerenteOcorrencias gerenteEncontrado = obterGerente(id);
		
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			System.out.println(JwtUtil.rolePermitida(token, "EMPRESA"));
			throw new NoPermissionException("Você não tem permissão para listar esse usuario");
		}
		
		return gerenteEncontrado;
	}
	
}
