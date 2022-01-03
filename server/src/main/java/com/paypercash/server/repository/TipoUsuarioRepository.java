package com.paypercash.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface TipoUsuarioRepository<TipoUsuario> extends JpaRepository<TipoUsuario, Long> {
	public TipoUsuario findByEmail(String email);
}
