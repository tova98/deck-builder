package hr.ntovernic.deckbuilder.dto;

import java.util.List;

public record DeckDto(
        Long id,
        String title,
        String description,
        UserDto user,
        List<YGOCard> cards,
        List<CommentDto> comments
) {
}
