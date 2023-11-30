package hr.ntovernic.deckbuilder.controller;

import hr.ntovernic.deckbuilder.dto.ChangePasswordDto;
import hr.ntovernic.deckbuilder.dto.RegisterDto;
import hr.ntovernic.deckbuilder.dto.UserDto;
import hr.ntovernic.deckbuilder.dto.UserUpdateDto;
import hr.ntovernic.deckbuilder.exception.WrongPasswordException;
import hr.ntovernic.deckbuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_USER')")
    public UserDto getUserById(@PathVariable final Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void saveUser(@RequestBody final RegisterDto registerDto) {
        userService.saveUser(registerDto);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void updateUser(@PathVariable final Long userId, @RequestBody final UserUpdateDto userUpdateDto) {
        userService.updateUser(userId, userUpdateDto);
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') || @currentUserService.isCurrentUserMakingRequest(#userId)")
    public void changeUserPassword(@PathVariable final Long userId,
                                   @RequestBody final ChangePasswordDto changePasswordDto) throws WrongPasswordException {
        userService.changeUserPassword(userId, changePasswordDto);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(@PathVariable final Long userId) {
        userService.deleteUser(userId);
    }
}
