import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn()) {
      return true;
    }
    if(this.authService.tokenExists()) {
      return this.authService.fetchUser().pipe(map(() => {
        return true;
      }));
    }
      
    this.snackBar.open("You need to be logged in to access this page!", "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
    this.router.navigate(["/login"]);
    return false;
  }
}