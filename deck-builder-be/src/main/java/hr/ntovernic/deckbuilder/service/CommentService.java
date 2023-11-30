package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.dto.CommentDto;
import hr.ntovernic.deckbuilder.dto.CreateCommentDto;
import hr.ntovernic.deckbuilder.mapper.CommentMapper;
import hr.ntovernic.deckbuilder.model.Comment;
import hr.ntovernic.deckbuilder.model.Deck;
import hr.ntovernic.deckbuilder.model.User;
import hr.ntovernic.deckbuilder.repository.CommentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final DeckService deckService;
    private final CurrentUserService currentUserService;
    private final CommentMapper commentMapper;

    public CommentDto createComment(final CreateCommentDto commentDto) {
        final Deck deck = deckService.getDeck(commentDto.deckId());
        final User user = currentUserService.getCurrentUser();
        final Comment comment = new Comment();
        comment.setText(commentDto.text());
        comment.setUser(user);
        comment.setDeck(deck);

        return commentMapper.toDto(commentRepository.save(comment));
    }

    public void deleteComment(final Long commentId) {
        commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Comment with id %d not found!", commentId)));
        commentRepository.deleteById(commentId);
    }

}
