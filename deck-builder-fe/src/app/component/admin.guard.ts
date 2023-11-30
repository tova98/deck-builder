import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn()) {
      return this.authService.isLoggedInAdmin();
    }
    if(this.authService.tokenExists()) {
      return this.authService.fetchUser().pipe(map(user => {
        if(user && user.role == Role.ROLE_ADMIN) return true;
  
        this.showErrorSnackBar();
        return false;
      }));
    }
    this.showErrorSnackBar();
    return false;
  }

  showErrorSnackBar() {
    this.snackBar.open("You need to be admin to access this page!", "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
    this.router.navigate(["/decks"]);
  }
}