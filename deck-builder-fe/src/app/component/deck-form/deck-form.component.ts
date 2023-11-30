import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/app/service/deck.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { DeckDto } from 'src/app/dto/deck.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deck } from 'src/app/model/deck';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/model/card';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css']
})
export class DeckFormComponent implements OnInit {

  isAddMode: boolean = true;
  deckForm!: FormGroup;

  searchText: string = "";
  cards: Card[];

  selectedCards: Card[];

  currentDeckId: number | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private deckService: DeckService,
              private authService: AuthService, private userService: UserService, 
              private cardService: CardService, private dialog: MatDialog) {

    this.cards = [];
    this.selectedCards = [];
  }

  ngOnInit(): void {
    if(this.router.url.startsWith("/edit-deck")) {
      this.isAddMode = false;
      this.currentDeckId = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.deckForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });

    if(!this.isAddMode) {
      this.deckService.getDeck(this.currentDeckId!).subscribe(deck => {
        this.deckForm.patchValue(deck);
        this.selectedCards = deck.cards;
      });
    }

    this.loadCards();
  }

  loadCards() {
    this.cardService.getAllCards().subscribe((cards: any) => {
      this.cards = cards;
    });
  }

  addCard(card: Card) {
    this.selectedCards.push(card);
  }

  removeCard(card: Card) {
    let index = this.selectedCards.indexOf(card);
    this.selectedCards.splice(index, 1);
  }

  onSubmit() {
    const deck: DeckDto = this.deckForm.value;
    deck.cardIds = this.selectedCards.map(card => card.id);
    if(this.isAddMode) {
      this.deckService.save(deck).subscribe(() => this.gotoDeckList());
    } else {
      this.deckService.update(this.currentDeckId!, deck).subscribe(() => this.gotoDeckList());
    }
  }

  gotoDeckList() {
    this.router.navigate(['/decks']);
  }

}
