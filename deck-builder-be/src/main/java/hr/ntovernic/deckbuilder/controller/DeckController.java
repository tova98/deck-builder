package hr.ntovernic.deckbuilder.controller;

import hr.ntovernic.deckbuilder.dto.UpsertDeckDto;
import hr.ntovernic.deckbuilder.dto.DeckDto;
import hr.ntovernic.deckbuilder.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/deck")
@RequiredArgsConstructor
public class DeckController {

    private final DeckService deckService;

    @GetMapping("/all")
    public Page<DeckDto> getDecksFiltered(final Pageable pageable, @RequestParam("title") final Optional<String> title) {
        return deckService.getDecksFiltered(pageable, title);
    }

    @GetMapping("/all/count")
    public Integer getDecksFilteredCount(@RequestParam("title") final Optional<String> title) {
        return deckService.getDecksFilteredCount(title);
    }

    @GetMapping("/all/user/{userId}")
    public Page<DeckDto> getDecksFilteredByUser(final Pageable pageable, @PathVariable final Long userId, @RequestParam("title") final Optional<String> title) {
        return deckService.getDecksFilteredByUser(pageable, userId, title);
    }

    @GetMapping("/all/count/user/{userId}")
    public Integer getDecksFilteredByUserCount(@PathVariable final Long userId, @RequestParam("title") final Optional<String> title) {
        return deckService.getDecksFilteredByUserCount(userId, title);
    }

    @GetMapping("/{deckId}")
    public DeckDto getDeck(@PathVariable final Long deckId) {
        return deckService.getDeckById(deckId);
    }

    @PostMapping
    public DeckDto createDeck(@RequestBody final UpsertDeckDto deckDto) {
        return deckService.createDeck(deckDto);
    }

    @PutMapping("/{deckId}")
    public DeckDto updateDeck(@PathVariable final Long deckId, @RequestBody final UpsertDeckDto deckDto) {
        return deckService.updateDeck(deckId, deckDto);
    }

    @DeleteMapping("/{deckId}")
    public void deleteDeck(@PathVariable final Long deckId) {
        deckService.deleteDeck(deckId);
    }
}
