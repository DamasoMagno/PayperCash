package com.paypercash.server.security;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.context.annotation.Configuration;

@Configuration
public class FieldsValidator {
	
	public static final String EMAIL_REGEX = "^(.+)@(.+)$";

	public static boolean fieldIsValid(String typeField, String field) {
		Pattern pattern = null;
		
		switch (typeField) {
		case "email":
			pattern = Pattern.compile(EMAIL_REGEX);
			break;
		default:
			break;
		}
		
		Matcher isValid = pattern.matcher(field);
		return isValid.matches();
	}
	
}
