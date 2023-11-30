package hr.ntovernic.deckbuilder.dto;

import hr.ntovernic.deckbuilder.model.Role;

public record UserUpdateDto(
        String username,
        String email,
        Role role
) {
}
