package hr.ntovernic.deckbuilder.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hr.ntovernic.deckbuilder.model.Role;

import java.time.LocalDateTime;

public record UserDto (
        Long id,
        String username,
        String email,
        Role role,
        @JsonFormat(pattern="yyyy-MM-dd HH:mm") LocalDateTime joinDate
) {
}
