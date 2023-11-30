package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.dto.UpsertDeckDto;
import hr.ntovernic.deckbuilder.dto.DeckDto;
import hr.ntovernic.deckbuilder.mapper.DeckMapper;
import hr.ntovernic.deckbuilder.model.Deck;
import hr.ntovernic.deckbuilder.repository.DeckRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeckService {

    private final DeckRepository deckRepository;
    private final DeckMapper deckMapper;
    private final CurrentUserService currentUserService;

    public Page<DeckDto> getDecksFiltered(final Pageable pageable, final Optional<String> title) {
        if (title.isPresent()) {
            final Page<Deck> deckPage = deckRepository.findAllByTitleContainsIgnoreCase(title.get(), pageable);
            return deckMapper.toDtoPage(deckPage);
        }

        final Page<Deck> deckPage = deckRepository.findAll(pageable);
        return deckMapper.toDtoPage(deckPage);
    }

    public Integer getDecksFilteredCount(final Optional<String> title) {
        if (title.isPresent()) {
            return deckRepository.countAllByTitleContainsIgnoreCase(title.get());
        }

        return Math.toIntExact(deckRepository.count());
    }

    public Page<DeckDto> getDecksFilteredByUser(final Pageable pageable, final Long userId, final Optional<String> title) {
        if (title.isPresent()) {
            final Page<Deck> deckPage = deckRepository.findAllByUserIdAndTitleContainsIgnoreCase(userId, title.get(), pageable);
            return deckMapper.toDtoPage(deckPage);
        }

        final Page<Deck> deckPage = deckRepository.findAllByUserId(userId, pageable);
        return deckMapper.toDtoPage(deckPage);
    }

    public Integer getDecksFilteredByUserCount(final Long userId, final Optional<String> title) {
        if (title.isPresent()) {
            return deckRepository.countAllByUserIdAndTitleContainsIgnoreCase(userId, title.get());
        }

        return deckRepository.countAllByUserId(userId);
    }

    public DeckDto getDeckById(final Long deckId) {
        return deckMapper.toDto(getDeck(deckId));
    }

    public DeckDto createDeck(final UpsertDeckDto deckDto) {
        final Deck deck = deckMapper.toEntity(deckDto);
        deck.setUser(currentUserService.getCurrentUser());

        return deckMapper.toDto(deckRepository.save(deck));
    }

    public DeckDto updateDeck(final Long deckId, final UpsertDeckDto deckDto) {
        final Deck deck = getDeck(deckId);
        deck.setTitle(deckDto.title());
        deck.setDescription(deckDto.description());
        deck.getCardIds().clear();
        deck.getCardIds().addAll(deckDto.cardIds());

        return deckMapper.toDto(deckRepository.save(deck));
    }

    public void deleteDeck(final Long deckId) {
        getDeck(deckId);
        deckRepository.deleteById(deckId);
    }

    public Deck getDeck(final Long deckId) {
        return deckRepository.findById(deckId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Deck with id %d not found!", deckId)));
    }
}
