package hr.ntovernic.deckbuilder.dto;

public record CreateCommentDto(
        String text,
        Long deckId
) {
}
