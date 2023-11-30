package hr.ntovernic.deckbuilder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record YGOCardImage(
        @JsonProperty("image_url") String imageUrl,
        @JsonProperty("image_url_small") String imageUrlSmall
) {
}
