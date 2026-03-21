package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    // ============================================
    // NOTE:
    // This file contains Spring Security settings.
    // Added extra comments for readability & Git testing.
    // No business logic has been modified.
    // ============================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt is a strong hashing algorithm recommended for passwords
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // INFO: Initializing CORS configuration
        CorsConfiguration corsConfig = new CorsConfiguration();

        // Allowed frontend origins (Angular + backend testing)
        corsConfig.setAllowedOrigins(List.of(
                "http://localhost:4200",
                "http://localhost:8080"
        ));

        // Supported HTTP methods
        corsConfig.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        // Allow all headers for flexibility during development
        corsConfig.setAllowedHeaders(List.of("*"));

        // Allow cookies / auth headers if needed
        corsConfig.setAllowCredentials(true);

        http
            // CSRF disabled for testing APIs (enable in production)
            .csrf(csrf -> csrf.disable())

            // Apply custom CORS configuration
            .cors(cors -> cors.configurationSource(request -> corsConfig))

            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/sales/**").permitAll()
                .requestMatchers("/api/customers/**").permitAll()

                // TEMP: allow all other endpoints (for development only)
                .anyRequest().permitAll()
            )

            // Disable default login mechanisms (using custom auth or APIs)
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        // DEBUG NOTE:
        // Security filter chain configured successfully

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        // Provides authentication manager from Spring context
        return authConfig.getAuthenticationManager();
    }
}