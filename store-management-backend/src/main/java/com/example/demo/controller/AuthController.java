package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtill jwtUtil;

    // ✅ REGISTER NEW USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "❌ Username already exists!"
                ));
            }

            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER");
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Save user with all fields
            userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "✅ User registered successfully!"
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "❌ Registration failed: " + e.getMessage()
            ));
        }
    }

    // ✅ LOGIN EXISTING USER
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User dbUser = userRepository.findByUsername(user.getUsername()).orElse(null);

            if (dbUser == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "❌ User not found!"
                ));
            }

            if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "❌ Invalid password!"
                ));
            }

            // ✅ Generate JWT token
            String token = jwtUtil.generateToken(dbUser.getUsername(), dbUser.getRole());

            // ✅ Return token + role + full user info (without password)
            dbUser.setPassword(null); // don't expose password

            return ResponseEntity.ok(Map.of(
                "success", true,
                "token", token,
                "role", dbUser.getRole(),
                "user", dbUser, // 👈 Add this line
                "message", "✅ Login successful!"
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "❌ Login failed: " + e.getMessage()
            ));
        }
    }

}
