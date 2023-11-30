package hr.ntovernic.deckbuilder.dto;

public record ChangePasswordDto (
        String currentPassword,
        String newPassword
) {
}
