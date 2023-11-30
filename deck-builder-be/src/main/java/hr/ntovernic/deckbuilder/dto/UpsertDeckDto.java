package hr.ntovernic.deckbuilder.dto;

import java.util.List;

public record UpsertDeckDto(
        String title,
        String description,
        List<Long> cardIds
) {
}
