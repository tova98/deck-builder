package hr.ntovernic.deckbuilder.repository;

import hr.ntovernic.deckbuilder.model.Deck;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeckRepository extends JpaRepository<Deck, Long> {

    Page<Deck> findAllByTitleContainsIgnoreCase(String title, Pageable pageable);
    Integer countAllByTitleContainsIgnoreCase(String title);
    Page<Deck> findAllByUserId(Long userId, Pageable pageable);
    Integer countAllByUserId(Long userId);
    Page<Deck> findAllByUserIdAndTitleContainsIgnoreCase(Long userId, String title, Pageable pageable);
    Integer countAllByUserIdAndTitleContainsIgnoreCase(Long userId, String title);
}
