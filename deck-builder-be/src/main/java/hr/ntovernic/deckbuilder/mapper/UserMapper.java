package hr.ntovernic.deckbuilder.mapper;

import hr.ntovernic.deckbuilder.dto.RegisterDto;
import hr.ntovernic.deckbuilder.dto.UserDto;
import hr.ntovernic.deckbuilder.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    public UserDto toDto(final User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getJoinDate()
        );
    }

    public List<UserDto> toDtoList(final List<User> userList) {
        return userList.stream()
                .map(this::toDto)
                .toList();
    }

    public User toEntity(final RegisterDto userDto) {
        final User user = new User();
        user.setUsername(userDto.username());
        user.setEmail(userDto.email());

        return user;
    }
}
