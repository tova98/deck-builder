package hr.ntovernic.deckbuilder.service;

import hr.ntovernic.deckbuilder.dto.YGOCard;
import hr.ntovernic.deckbuilder.dto.YGOCardList;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardCacheService {

    private List<YGOCard> cardCache = new ArrayList<>();

    public List<YGOCard> getCardList() {
        return cardCache;
    }

    public List<YGOCard> getCardListByIds(final List<Long> cardIds) {
        return cardIds.stream()
                .map(cardId -> cardCache.stream().filter(card -> cardId.equals(card.id())).findFirst().get())
                .toList();
    }

    @PostConstruct
    public void initializeCardList() {
        log.info("Loading card cache...");

        final WebClient webClient = WebClient.builder()
                .baseUrl("https://db.ygoprodeck.com/api/v7/cardinfo.php")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(20 * 1024 * 1024))
                .build();

        final YGOCardList cards = webClient.get()
                .retrieve()
                .bodyToMono(YGOCardList.class)
                .block();

        if (Objects.nonNull(cards)) {
            cardCache = cards.data();
        }

        log.info("Card cache done loading!");
    }
}
