package com.paypercash.server.services;

import com.paypercash.server.enums.OcurrencyStatus;
import com.paypercash.server.enums.Perfil;
import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.security.JwtUtil;
import com.paypercash.utils.handlerErrors;

import io.jsonwebtoken.Claims;

import java.util.List;

import javax.naming.NoPermissionException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class OcorrenciaService extends handlerErrors {

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;
	@Autowired
	private TecnicoService tecnicoService;
	@Autowired
	private EmpresaRepository empresaRepository;

	public Ocorrencia obterOcorrencia(Long id) {
		return ocorrenciaRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(erroNaoEncontrado("Ocorrencia")));
	}

	public String erroNaoEncontrado(String entidade) {
		return entidade + " não encontrad" + entidade.charAt(entidade.length() - 1);
	}
	
	public Ocorrencia direcionarOcorrencia(Long id, Long userId) throws Exception {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);
		Tecnico tecnicoEncontrado = tecnicoService.obterTecnicoPeloId(userId);
		
		if(ocorrenciaExiste.getTecnico() != null) {
			throw new Exception("Ocorrencia já direcionada a outro técnico");
		}

		ocorrenciaExiste.setTecnico(tecnicoEncontrado);

		Ocorrencia ocorrenciaNaoPendente = ocorrenciaRepository.save(ocorrenciaExiste);
		return ocorrenciaNaoPendente;
	}

	public Ocorrencia finalizarOcorrencia(Ocorrencia ocorrencia, Long id) throws Exception {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);

		if(ocorrenciaExiste.getStatus() == OcurrencyStatus.CONCLUIDO) {
			throw new Exception("Ocorrencia já finalizada");
		}
		
		if (ocorrencia.getResolucao() != null && ocorrenciaExiste.getTecnico() != null) {
			ocorrenciaExiste.setResolucao(ocorrencia.getResolucao());
			ocorrenciaExiste.setStatus(OcurrencyStatus.CONCLUIDO);
		} else {
			throw new Exception("Nenhum tecnico, ocupado com esta ocorrencia");
		}

		Ocorrencia novaOcorrencia = ocorrenciaRepository.save(ocorrenciaExiste);
		return novaOcorrencia;
	}

	public Ocorrencia criarOcorrencia(Ocorrencia ocorrencia, Long userId) throws Exception {		
		CategoriaOcorrencia categoriaEncontrada = categoriaOcorrenciaRepository
				.findByNome(ocorrencia.getTipo_categoria());
		
		if (categoriaEncontrada == null) {
			throw new EntityNotFoundException("Categoria não encontrada");
		}

		List<Empresa> empresaEncontrada = empresaRepository.findAll();
		GerenteOcorrencias gerenteOcorrenciasEcontrando = gerenteOcorrenciasRepository.findById(userId).get();

		ocorrencia.setGerenteOcorrencias(gerenteOcorrenciasEcontrando);
		ocorrencia.setCategoriaOcorrencia(categoriaEncontrada);
		ocorrencia.setEmpresa(empresaEncontrada.get(0));

		Ocorrencia ocorrenciaCriada = ocorrenciaRepository.save(ocorrencia);
		return ocorrenciaCriada;
	}

	public void removerCategoria(Claims token, Long id) throws NoPermissionException {
		if(!JwtUtil.rolePermitida(token, Perfil.GERENTE.toString())) {
			throw new NoPermissionException(errorNotPermission);
		}
		
		Ocorrencia ocorrenciaJaExiste = ocorrenciaRepository.findById(id).orElse(null);
		
		if(ocorrenciaJaExiste == null) {
			throw new EmptyResultDataAccessException("Ocorrencia já foi removida", 0, null);
		}
		
		ocorrenciaRepository.delete(ocorrenciaJaExiste);;
	}
}
