package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.dto.LoginDto;
import hr.ntovernic.deckbuilder.dto.LoginResponse;
import hr.ntovernic.deckbuilder.dto.RegisterDto;
import hr.ntovernic.deckbuilder.dto.UserDto;
import hr.ntovernic.deckbuilder.mapper.UserMapper;
import hr.ntovernic.deckbuilder.model.Role;
import hr.ntovernic.deckbuilder.model.User;
import hr.ntovernic.deckbuilder.repository.UserRepository;
import hr.ntovernic.deckbuilder.security.TokenProvider;
import hr.ntovernic.deckbuilder.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserDto getCurrentUser() {
        final User user = getUserFromAuth();

        return userMapper.toDto(user);
    }

    public LoginResponse login(final LoginDto loginDto) {
        final Authentication auth = new UsernamePasswordAuthenticationToken(loginDto.username(), loginDto.password());
        authenticationManager.authenticate(auth);

        final User user = userRepository.findByUsername(loginDto.username());
        final String token = tokenProvider.generateToken(user.getUsername(), user.getRole());
        final UserDto userDto = userMapper.toDto(user);
        return new LoginResponse(userDto, token);
    }

    public void register(final RegisterDto registerDto) {
        userValidator.checkUsernameUniqueness(registerDto.username());
        userValidator.checkEmailUniqueness(registerDto.email());

        final User user = userMapper.toEntity(registerDto);
        user.setRole(Role.ROLE_USER);
        user.setPassword(passwordEncoder.encode(registerDto.password()));
        user.setJoinDate(LocalDateTime.now());

        userRepository.save(user);
    }

    private User getUserFromAuth() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username);
    }
}
