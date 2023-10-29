package main.java.com.cst438.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cst438.dto.AccountCredentials;
import com.cst438.service.JwtService;

import java.util.stream.Collectors;

@RestController
public class LoginController {

    @Autowired
    private JwtService jwtService;

    @Autowired    
    AuthenticationManager authenticationManager;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(), // Modified from credentials.username()
                        credentials.getPassword());

        Authentication auth = authenticationManager.authenticate(creds);

        // Extract roles from the Authentication object
        String roles = auth.getAuthorities().stream()
                           .map(GrantedAuthority::getAuthority)
                           .collect(Collectors.joining(","));

        // Modify the getToken method to include roles
        String jwts = jwtService.getToken(auth.getName(), roles);

        // Build response with the generated token
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }
}