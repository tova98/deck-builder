package hr.ntovernic.deckbuilder.mapper;

import hr.ntovernic.deckbuilder.dto.CommentDto;
import hr.ntovernic.deckbuilder.model.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CommentMapper {

    private final UserMapper userMapper;

    public CommentDto toDto(final Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getText(),
                userMapper.toDto(comment.getUser()),
                comment.getCreatedAt()
        );
    }

    public List<CommentDto> toDtoList(final List<Comment> comments) {
        return comments.stream()
                .map(this::toDto)
                .toList();
    }
}
