package hr.ntovernic.deckbuilder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record YGOCardList(
        @JsonProperty("data") List<YGOCard> data
) {
}
