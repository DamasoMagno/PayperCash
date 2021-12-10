package com.paypercash.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static String[] PUBLIC_MACHES = {
    "/enterprises/**",
    "/manager/**",
    "/technicians/**",
    "/ocurrencies/**"
  };

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable();
    http.authorizeRequests()
      .antMatchers(PUBLIC_MACHES).permitAll()
      .anyRequest().authenticated();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  // @Bean
  // CorsConfigurationSource corsConfigurationSource(){
  //   final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  //   source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
  //   return source;  
  // }
  
  // @Bean
  // public BCryptPasswordEncoder bCryptPasswordEncoder(){
  //   return new BCryptPasswordEncoder();
  // }
}
