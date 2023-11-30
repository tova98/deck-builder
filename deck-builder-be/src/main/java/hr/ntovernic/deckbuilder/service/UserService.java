package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.dto.ChangePasswordDto;
import hr.ntovernic.deckbuilder.dto.RegisterDto;
import hr.ntovernic.deckbuilder.dto.UserDto;
import hr.ntovernic.deckbuilder.dto.UserUpdateDto;
import hr.ntovernic.deckbuilder.exception.WrongPasswordException;
import hr.ntovernic.deckbuilder.mapper.UserMapper;
import hr.ntovernic.deckbuilder.model.Role;
import hr.ntovernic.deckbuilder.model.User;
import hr.ntovernic.deckbuilder.repository.UserRepository;
import hr.ntovernic.deckbuilder.validator.UserValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final UserMapper userMapper;
    private final CurrentUserService currentUserService;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getUsers() {
        final List<User> userList = userRepository.findAll();

        return userMapper.toDtoList(userList);
    }

    public UserDto getUserById(final Long userId) {
        final User user = getUser(userId);

        return userMapper.toDto(user);
    }

    public void saveUser(final RegisterDto registerDto) {
        userValidator.checkUsernameUniqueness(registerDto.username());
        userValidator.checkEmailUniqueness(registerDto.email());

        final User user = userMapper.toEntity(registerDto);
        user.setPassword(passwordEncoder.encode(registerDto.password()));
        user.setJoinDate(LocalDateTime.now());

        userRepository.save(user);
    }

    public void updateUser(final Long userId, final UserUpdateDto userUpdateDto) {
        final User user = getUser(userId);

        userValidator.checkUsernameUniqueness(user, userUpdateDto.username());
        userValidator.checkEmailUniqueness(user, userUpdateDto.email());

        user.setUsername(userUpdateDto.username());
        user.setEmail(userUpdateDto.email());

        if(!currentUserService.isCurrentUserAdmin()) {
            user.setRole(Role.ROLE_USER);
        } else {
            user.setRole(userUpdateDto.role());
        }

        userRepository.save(user);
    }

    public void changeUserPassword(final Long userId, final ChangePasswordDto changePasswordDto) throws WrongPasswordException {
        final User user = getUser(userId);
        userValidator.checkPassword(changePasswordDto.currentPassword(), user.getPassword());

        user.setPassword(passwordEncoder.encode(changePasswordDto.newPassword()));
        userRepository.save(user);
    }

    public void deleteUser(final Long userId) {
        final User user = getUser(userId);
        userRepository.delete(user);
    }

    private User getUser(final Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with id %d not found!", userId)));
    }
}
