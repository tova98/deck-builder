package hr.ntovernic.deckbuilder.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record CommentDto (
        Long id,
        String text,
        UserDto user,
        @JsonFormat(pattern="yyyy-MM-dd HH:mm") LocalDateTime timestamp
) {
}
