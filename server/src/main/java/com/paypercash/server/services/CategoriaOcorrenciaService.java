package com.paypercash.server.services;

import java.util.List;

import javax.naming.NoPermissionException;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;

@Service
public class CategoriaOcorrenciaService extends handlerErrors{
	
	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;

	public CategoriaOcorrencia obterCategoria(Long id) {
		return categoriaOcorrenciaRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
	}
	
	public List<CategoriaOcorrencia> exibirTodasAsCategorias(Claims token) throws NoPermissionException{
		if(JwtUtil.rolePermitida(token, "TECNICO")) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		return categoriaOcorrenciaRepository.findAll();
	}
	
	public void removerCategoria(Claims token, Long id) throws NoPermissionException {
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		CategoriaOcorrencia categoriaJaExiste = obterCategoria(id);
		
		categoriaOcorrenciaRepository.delete(categoriaJaExiste);
	}
	
	public CategoriaOcorrencia exibirCategoria(Claims token, Long id) throws NoPermissionException {
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		CategoriaOcorrencia categoriaJaExiste = obterCategoria(id);
		
		return categoriaJaExiste;
	}
	
	public CategoriaOcorrencia criarCatgoria(CategoriaOcorrencia categoria, Claims token) throws NoPermissionException {
		if(!JwtUtil.rolePermitida(token, "EMPRESA")) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		CategoriaOcorrencia categoriaJaExiste = categoriaOcorrenciaRepository.findByNome(categoria.getNome());
		
		if (categoriaJaExiste != null) {
			throw new EntityExistsException("Não é possivel cadastrar duas categorias iguais");
		}

		CategoriaOcorrencia novaCategoria = categoriaOcorrenciaRepository.save(categoria);
		
		return novaCategoria;
	}

}
