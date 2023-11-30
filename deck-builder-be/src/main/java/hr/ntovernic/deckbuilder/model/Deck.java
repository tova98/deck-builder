package hr.ntovernic.deckbuilder.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    private User user;

    @ElementCollection
    private List<Long> cardIds;

    @OneToMany(mappedBy = "deck")
    private List<Comment> comments = new ArrayList<>();
}
