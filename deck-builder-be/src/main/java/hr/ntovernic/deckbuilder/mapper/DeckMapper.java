package hr.ntovernic.deckbuilder.mapper;

import hr.ntovernic.deckbuilder.dto.UpsertDeckDto;
import hr.ntovernic.deckbuilder.dto.DeckDto;
import hr.ntovernic.deckbuilder.model.Deck;
import hr.ntovernic.deckbuilder.service.CardCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DeckMapper {

    private final UserMapper userMapper;
    private final CommentMapper commentMapper;
    private final CardCacheService cardCacheService;

    public DeckDto toDto(final Deck deck) {
        return new DeckDto(
                deck.getId(),
                deck.getTitle(),
                deck.getDescription(),
                userMapper.toDto(deck.getUser()),
                cardCacheService.getCardListByIds(deck.getCardIds()),
                commentMapper.toDtoList(deck.getComments())
        );
    }

    public Page<DeckDto> toDtoPage(final Page<Deck> deckPage) {
        return deckPage.map(this::toDto);
    }

    public List<DeckDto> toDtoList(final List<Deck> deckList) {
        return deckList.stream()
                .map(this::toDto)
                .toList();

    }

    public Deck toEntity(final UpsertDeckDto deckDto) {
        final Deck deck = new Deck();
        deck.setTitle(deckDto.title());
        deck.setDescription(deckDto.description());
        deck.setCardIds(deckDto.cardIds());

        return deck;
    }
}
