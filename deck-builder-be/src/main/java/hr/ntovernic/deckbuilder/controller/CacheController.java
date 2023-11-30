package hr.ntovernic.deckbuilder.controller;

import hr.ntovernic.deckbuilder.dto.YGOCard;
import hr.ntovernic.deckbuilder.service.CardCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/cache")
@RequiredArgsConstructor
public class CacheController {

    private final CardCacheService cardCacheService;

    @GetMapping
    public List<YGOCard> getAllCards() {
        return cardCacheService.getCardList();
    }
}
