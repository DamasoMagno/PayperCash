package com.paypercash.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static String[] PUBLIC_MACHES = {
    "/enterprises/**",
    "/manager/**",
    "/technicians/**",
    "/ocurrencies/**",
    "/categories/**"
  };

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable();
    http.authorizeRequests()
      .antMatchers(PUBLIC_MACHES).permitAll()
      .anyRequest().authenticated();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource(){
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
    return source;  
  }
  
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
    .withUser("admin").password("admin").roles("ADMIN");
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder(){
    return new BCryptPasswordEncoder();
  }
}
