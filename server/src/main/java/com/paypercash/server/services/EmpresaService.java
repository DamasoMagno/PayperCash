package com.paypercash.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.Empresa;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.security.JwtUtil;

@Service
public class EmpresaService {
	@Autowired
	private EmpresaRepository empresaRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public Empresa obterEmpresaPeloEmail(String email) {
		return empresaRepository.findByEmail(email);
	}

	public Empresa obterEmpresaPeloId(Long id) {
		return empresaRepository.findById(id).get();
	}

	public Empresa criarEmpresa(Empresa empresa) throws Exception {
		List<Empresa> empresaJaExiste = empresaRepository.findAll();
		if (empresaJaExiste.size() == 1) {
			throw new Exception("Não é possivel cadastrar mais de uma empresa no ssitema");
		}
		empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));
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

		return JwtUtil.createJWT("213123", "Damaso Magno Lima", empresaEncontrada.getId().toString(), 60000);
	}

	public Empresa atualizarEmpresaDados(Empresa empresa, Long id) throws Exception {
		Empresa empresaEncontrada = obterEmpresaPeloId(id);
		if (empresa.getEmail() != null) {
			empresaEncontrada.setEmail(empresa.getEmail());
		}
		if (empresa.getEndereco() != null) {
			empresaEncontrada.setEndereco(empresa.getEndereco());
		}
		if (empresa.getNome() != null) {
			empresaEncontrada.setNome(empresa.getNome());
		}
		if (empresa.getSenha() != null) {
			empresaEncontrada.setSenha(passwordEncoder.encode(empresa.getSenha()));
		}
		Empresa empresaAtualizada = empresaRepository.save(empresaEncontrada);
		return empresaAtualizada;
	}
}