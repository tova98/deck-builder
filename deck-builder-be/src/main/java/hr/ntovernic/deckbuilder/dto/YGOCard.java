package hr.ntovernic.deckbuilder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record YGOCard(
        @JsonProperty("id") Long id,
        @JsonProperty("name") String name,
        @JsonProperty("type") String type,
        @JsonProperty("desc") String desc,
        @JsonProperty("card_images") List<YGOCardImage> cardImages
) {
}
