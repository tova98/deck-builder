import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';
import { LoginUserDto } from '../dto/login-user.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string;
  currentUser: User | undefined = undefined;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.authUrl = 'http://localhost:8080/auth';
    this.currentUser = undefined;
    this.init();
  }  

  init(): void {
    if(!this.currentUser && this.getToken()) {
      this.fetchUser().subscribe(() => {
        if(!this.currentUser) {
          this.gotoLogin();
        }
      });
    }
  }

  fetchUser() {
    return this.http.get<User>(this.authUrl + '/current').pipe(map(user => {
      this.currentUser = user;
      return user;
    }));
  }

  register(user: User) {
    return this.http.post<User>(this.authUrl + '/register', user).subscribe(() => {
      this.snackBar.open("Registration successful!", "✔️", { duration: 3000, panelClass: ['snackbar-success'], verticalPosition: 'top'});
      this.gotoLogin();
    });
  }

  login(user: LoginUserDto) {
    return this.http.post<LoginUserDto>(this.authUrl + '/login', user).subscribe((response: any) => {
      localStorage.setItem('access_token', response.token);
      this.currentUser = response.user;
      this.snackBar.open("Login successful!", "✔️", { duration: 3000, panelClass: ['snackbar-success'], verticalPosition: 'top'});
      this.gotoDecksList();
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUser = undefined;
    this.gotoLogin();
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  tokenExists() {
    const token = this.getToken();
    return token ? true : false;
  }

  isLoggedIn() {
    return this.currentUser;
  }

  isLoggedInAdmin() {
    return this.currentUser?.role === Role.ROLE_ADMIN;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserId() {
    return this.currentUser!.id;
  }

  gotoDecksList() {
    this.router.navigate(['/decks']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
