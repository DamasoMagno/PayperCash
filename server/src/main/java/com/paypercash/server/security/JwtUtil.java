package com.paypercash.server.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import com.paypercash.server.enums.Perfil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

	private static String SECRET = "springBootELegal";
	private static Integer EXPERATION_TIME = 120000;

	public static String createJWT(String id, String issuer, String subject, Perfil perfil,long ttlMillis) {
		return Jwts.builder()
				.setSubject(subject)
				.setIssuer(issuer)
				.setExpiration(new Date(System.currentTimeMillis() + EXPERATION_TIME))
				.claim("roles", perfil)
				.signWith(SignatureAlgorithm.HS512, SECRET)
				.compact();	
	}

	public static Claims decodeJWT(HttpServletRequest request) {
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		return Jwts.parser()
				.setSigningKey(DatatypeConverter.parseBase64Binary(SECRET))
				.parseClaimsJws(token)
				.getBody();
	}
	
	public static boolean rolePermitida(Claims token, String role) {
		return token.get("roles").equals(role);
	}
}
