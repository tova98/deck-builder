package hr.ntovernic.deckbuilder.dto;

public record LoginResponse(
        UserDto user,
        String token
) {
}
