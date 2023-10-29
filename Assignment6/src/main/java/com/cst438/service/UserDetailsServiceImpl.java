package com.cst438.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cst438.domain.User;
import com.cst438.domain.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User currentUser = repository.findByAlias(username); 

        if (currentUser == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        String role = currentUser.getRole();
        if (role == null || role.trim().isEmpty()) {
            throw new UsernameNotFoundException("User does not have any roles assigned.");
        }

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(new BCryptPasswordEncoder().encode(currentUser.getPassword()));
        builder.roles(role.toUpperCase());

        return builder.build();	    
    }
}