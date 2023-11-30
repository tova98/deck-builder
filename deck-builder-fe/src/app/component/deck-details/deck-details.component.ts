import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Deck } from 'src/app/model/deck';
import { Comment } from 'src/app/model/comment'; 
import { DeckService } from 'src/app/service/deck.service';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommentService } from 'src/app/service/comment.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentDto } from 'src/app/dto/comment.dto';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  deck: Deck;
  @ViewChild('preview') preview: any;

  constructor(private router: Router, private route: ActivatedRoute, private deckService: DeckService,
              private commentService: CommentService, public authService: AuthService, public dialog: MatDialog) {
    this.deck = new Deck();
  }

  ngOnInit(): void {
   this.loadDeck(); 
  }

  loadDeck() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deckService.getDeck(id).subscribe(deck => this.deck = deck);
  }

  setPreviewImage(pictureFilename: string) {
    this.preview.nativeElement.src = "http://localhost:8080/pictures/" + pictureFilename;
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
          this.gotoDeckList();
        })
      }
    })
  }

  createComment() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(CommentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((text: string) => {
      if(text) {
        const comment = new CommentDto();
        comment.text = text;
        comment.deckId = this.deck.id;
        this.commentService.save(comment).subscribe(() =>  {
          this.loadDeck(); 
        })
      }
    })
  }

  deleteComment(commentId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'comment',
      id: commentId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((commentId: number) => {
      if(commentId) {
        this.commentService.delete(commentId).subscribe(() =>  {
          this.deck.comments = this.deck.comments.filter(c => c.id !== commentId);
        })
      }
    })
  }

  canManage(): boolean {
    if(this.authService.isLoggedInAdmin()) return true;
    if(this.deck.user.id == this.authService.currentUser?.id) return true;

    return false;
  }

  canManageComment(comment: Comment): boolean {
    if(this.authService.isLoggedInAdmin()) return true;
    if(comment.user.id == this.authService.currentUser?.id) return true;

    return false;
  }
  
  gotoDeckList() {
    this.router.navigate(['/decks']);
  }
}
