package hr.ntovernic.deckbuilder.controller;

import hr.ntovernic.deckbuilder.dto.CommentDto;
import hr.ntovernic.deckbuilder.dto.CreateCommentDto;
import hr.ntovernic.deckbuilder.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public CommentDto createComment(@RequestBody final CreateCommentDto commentDto) {
        return commentService.createComment(commentDto);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable final Long commentId) {
        commentService.deleteComment(commentId);
    }
}
