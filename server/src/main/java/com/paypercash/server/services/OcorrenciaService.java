package com.paypercash.server.services;

import com.paypercash.server.enums.OcurrencyStatus;
import com.paypercash.server.models.CategoriaOcorrencia;
import com.paypercash.server.models.Empresa;
import com.paypercash.server.models.GerenteOcorrencias;
import com.paypercash.server.models.Ocorrencia;
import com.paypercash.server.models.Tecnico;
import com.paypercash.server.repository.CategoriaOcorrenciaRepository;
import com.paypercash.server.repository.EmpresaRepository;
import com.paypercash.server.repository.GerenteOcorrenciasRepository;
import com.paypercash.server.repository.OcorrenciaRepository;
import com.paypercash.server.repository.TecnicoRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcorrenciaService {

	@Autowired
	private OcorrenciaRepository ocorrenciaRepository;
	@Autowired
	private GerenteOcorrenciasRepository gerenteOcorrenciasRepository;
	@Autowired
	private CategoriaOcorrenciaRepository categoriaOcorrenciaRepository;
	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private EmpresaRepository empresaRepository;

	public Ocorrencia obterOcorrencia(Long id) {
		return ocorrenciaRepository.findById(id).get();
	}

	public Ocorrencia atenderOcorrencia(Long id, Long userId) throws Exception {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);
		Tecnico tecnicoEncontrado = tecnicoRepository.findById(userId).get();

		if (ocorrenciaExiste == null) {
			throw new Exception("Esta ocorrencia não exite");
		}

		if (tecnicoEncontrado == null) {
			throw new Exception("Infelizmente, não foi encontado nenhum tecnico, com esse email");
		}

		ocorrenciaExiste.setTecnico(tecnicoEncontrado);

		Ocorrencia ocorrenciaNaoPendente = ocorrenciaRepository.save(ocorrenciaExiste);
		return ocorrenciaNaoPendente;
	}

	public Ocorrencia finalizarOcorrencia(Ocorrencia ocorrencia, Long id) throws Exception {
		Ocorrencia ocorrenciaExiste = obterOcorrencia(id);

		if (ocorrenciaExiste == null) {
			throw new Exception("Esta ocorrencia não exite");
		}

		if (ocorrencia.getResolucao() != null && ocorrenciaExiste.getTecnico() != null) {
			ocorrenciaExiste.setResolucao(ocorrencia.getResolucao());
			ocorrenciaExiste.setStatus(OcurrencyStatus.CONLUIDO);
		} else {
			throw new Exception("Nenhum tecnico, ocupado com esta ocorrencia");
		}

		Ocorrencia novaOcorrencia = ocorrenciaRepository.save(ocorrenciaExiste);
		return novaOcorrencia;
	}

	public Ocorrencia criarOcorrencia(Ocorrencia ocorrencia, Long id) throws Exception {		
//		Optional<Ocorrencia> ocorrenciaJaExise = ocorrenciaRepository.findAll().stream()
//				.filter(x -> x.getDataCriacao().getMinute() == ocorrencia.getDataCriacao().getMinute()).findFirst();
		
		CategoriaOcorrencia categoriaEncontrada = categoriaOcorrenciaRepository
				.findByNome(ocorrencia.getTipo_categoria());

		System.out.println(categoriaEncontrada);
		
		if (categoriaEncontrada == null) {
			throw new Exception("Não é possivel cadastrar uma ocorrencia sem sua categoria");
		}

//		if (!ocorrenciaJaExise.isEmpty()) {
//			throw new Exception("Não é possivel, cadastrar mais de uma ocorrencia no mesmo minuto");
//		}

		List<Empresa> empresaEncontrada = empresaRepository.findAll();
		GerenteOcorrencias gerenteOcorrenciasEcontrando = gerenteOcorrenciasRepository.findById(id).get();

		ocorrencia.setGerenteOcorrencias(gerenteOcorrenciasEcontrando);
		ocorrencia.setCategoriaOcorrencia(categoriaEncontrada);
		ocorrencia.setEmpresa(empresaEncontrada.get(0));

		Ocorrencia ocorrenciaCriada = ocorrenciaRepository.save(ocorrencia);
		return ocorrenciaCriada;
	}

}
