import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DeckService } from '../service/deck.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceOwnerGuard implements CanActivate {
  constructor(public authService: AuthService, public deckService: DeckService, public router: Router, public snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedInAdmin()) {
      return true;
    }
    const deckId = Number(next.params['id'])
    return this.deckService.getDeck(deckId).pipe(map(deck => {
      if(this.authService.getCurrentUserId() == deck.user.id) {
        return true;
      }

      this.snackBar.open("You are not the owner of this resource!", "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
      this.router.navigate(["/decks"]);
      return false;
    }));
  }
}