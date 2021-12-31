package com.paypercash.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SecurityRepository<T> extends JpaRepository<T, Long> {
	public T findByEmail(String email);
}
