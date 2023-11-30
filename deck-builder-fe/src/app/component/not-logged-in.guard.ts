import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.tokenExists()) {
      return true;
    }

    this.snackBar.open("You are already logged in!", "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
    this.router.navigate(["/decks"]);
    return false;
  }
}