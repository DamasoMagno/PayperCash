package com.paypercash.server.services;

import java.util.List;

import javax.naming.directory.AttributeInUseException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.enums.Perfil;
import com.paypercash.server.models.Empresa;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.security.FieldsValidator;
import com.paypercash.server.security.JwtUtil;

@Service
public class EmpresaService {
	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public String erroNaoEncontrado(String entidade) {
		return entidade + " não encontrad" + entidade.charAt(entidade.length() - 1);
	}
	
	public Empresa obterEmpresaPeloEmail(String email) {
		return empresaRepository.findByEmail(email);
	}

	public Empresa obterEmpresaPeloId(Long id) {
		return empresaRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(erroNaoEncontrado("Empresa")));
	}

	public Empresa criarEmpresa(Empresa empresa) throws Exception {
		List<Empresa> empresaJaExiste = empresaRepository.findAll();
		
		if (empresaJaExiste.size() == 1) {
			throw new EntityExistsException("Não é possivel cadastrar duas empresas no sistemas");
		}
		
		empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));
		boolean emailIsValid = FieldsValidator.fieldIsValid("email", empresa.getEmail());
				
		if(!emailIsValid) {
			throw new Exception("Email inválido");
		}
		
		empresaRepository.save(empresa);
		return empresa;
	}

	public String autenticar(Empresa empresa) throws Exception {
		Empresa empresaEncontrada = empresaRepository.findByEmail(empresa.getEmail());
		final String errorLoginMessage = "Email/Senha está incorreta";

		if (empresaEncontrada == null)
			throw new BadCredentialsException(errorLoginMessage);

		boolean passwordIsValid = passwordEncoder.matches(empresa.getSenha(), empresaEncontrada.getSenha());

		if (passwordIsValid == false)
			throw new BadCredentialsException(errorLoginMessage);

		return JwtUtil.createJWT("213123", "Damaso Magno Lima", empresaEncontrada.getId().toString(), Perfil.EMPRESA, 120000);
	}

	public Empresa atualizarEmpresaDados(Empresa empresa, Long userId) throws Exception {
		Empresa empresaEncontrada = obterEmpresaPeloId(userId);
		
		if (empresa.getEmail() != null) {
			empresaEncontrada.setEmail(empresa.getEmail());
		}
		
		if (empresa.getEndereco() != null) {
			empresaEncontrada.setEndereco(empresa.getEndereco());
		}
		
		if (empresa.getNome() != null) {
			empresaEncontrada.setNome(empresa.getNome());
		}
		
		Empresa empresaAtualizada = empresaRepository.save(empresaEncontrada);
		return empresaAtualizada;
	}
	
	public void atualizarSenha(Empresa empresa) throws Exception {
		Empresa empresaEncontrada = obterEmpresaPeloEmail(empresa.getEmail());
		
		if(empresaEncontrada == null) {
			throw new EntityNotFoundException(erroNaoEncontrado("Empresa"));
		}
		
		if(empresa.getSenha() == "" || empresa.getSenha() == null) {
			throw new Exception("Senha inválida");
		}
		
		boolean senhaIgual = passwordEncoder.matches(empresa.getSenha(), empresaEncontrada.getSenha());
		
		if(senhaIgual) {
			throw new AttributeInUseException("Senha já em uso");
		}
		
		empresaEncontrada.setSenha(passwordEncoder.encode(empresa.getSenha()));
		empresaRepository.save(empresaEncontrada);
	}
}