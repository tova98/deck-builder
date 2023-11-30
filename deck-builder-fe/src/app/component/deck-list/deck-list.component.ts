import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/model/deck';
import { DeckService } from 'src/app/service/deck.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/component/delete-dialog/delete-dialog.component';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  filterForm!: FormGroup;
  currentFilter: any = {};

  allDecks: Deck[] = [];
  decks: Deck[] = [];

  onUserPage: boolean;

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private router: Router, private deckService: DeckService,
              public authService: AuthService,
              public dialog: MatDialog) {

    this.onUserPage = false;
  }

  ngOnInit(): void {
    if(this.router.url == "/decks") {
      this.loadDecksFiltered(0, this.pageSize);
    } else if(this.router.url == "/decks-user") {
      this.onUserPage = true;
      this.loadDecksFilteredByUser(0, this.pageSize);
    }

    this.filterForm = new FormGroup({
      'title': new FormControl(null)
    });
  }

  changePage(event: any) {
    this.pageSize = event.pageSize;
    if(!this.onUserPage) {
      this.loadDecksFiltered(event.pageIndex, event.pageSize);
    } else {
      this.loadDecksFilteredByUser(event.pageIndex, event.pageSize);
    }
  }

  onFilter() {
    this.currentFilter = this.filterForm.value;
    if(!this.onUserPage) {
      this.loadDecksFiltered(0, this.pageSize);
    } else {
      this.loadDecksFilteredByUser(0, this.pageSize);
    }
  }

  loadDecksFiltered(page: number, size: number) {
    this.deckService.getDecksFilteredCount(this.currentFilter.title).subscribe(count => {
      this.length = count;
    });

    this.deckService.findAllFiltered(page, size, this.currentFilter.title).subscribe((response: any) => {
      this.decks = response.content;
    });
    
  }

  loadDecksFilteredByUser(page: number, size: number) {
    const userId = this.authService.getCurrentUserId();

    this.deckService.getDecksFilteredByUserCount(userId, this.currentFilter.title).subscribe(count => {
      this.length = count;
    });

    this.deckService.findAllFilteredByUser(userId, page, size, this.currentFilter.title).subscribe((response: any) => {
      this.decks = response.content;
    });
  }

  delete(deckId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'deck',
      id: deckId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((deckId: number) => {
      if(deckId) {
        this.deckService.delete(deckId).subscribe(() =>  {
          this.decks = this.decks.filter(d => d.id !== deckId);
        })
      }
    })
  }

  canManage(): boolean {
    if(this.authService.isLoggedInAdmin()) return true;
    if(this.onUserPage) return true;

    return false;
  }

}
