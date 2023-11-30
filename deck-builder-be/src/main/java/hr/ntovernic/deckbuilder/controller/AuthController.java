package hr.ntovernic.deckbuilder.controller;

import hr.ntovernic.deckbuilder.dto.LoginDto;
import hr.ntovernic.deckbuilder.dto.LoginResponse;
import hr.ntovernic.deckbuilder.dto.RegisterDto;
import hr.ntovernic.deckbuilder.dto.UserDto;
import hr.ntovernic.deckbuilder.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/current")
    public UserDto getCurrentUser() {
        return authService.getCurrentUser();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody final LoginDto user) {
        return authService.login(user);
    }

    @PostMapping("/register")
    public void register(@RequestBody final RegisterDto user) {
        authService.register(user);
    }
}
