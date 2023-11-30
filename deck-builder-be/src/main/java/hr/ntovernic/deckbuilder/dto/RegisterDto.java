package hr.ntovernic.deckbuilder.dto;

import hr.ntovernic.deckbuilder.model.Role;

public record RegisterDto (
        String username,
        String email,
        String password,
        Role role
) {
}
