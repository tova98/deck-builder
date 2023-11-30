import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.usersUrl = 'http://localhost:8080/api/user';
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `/all`);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + `/${userId}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl + `/current`);
  }

  save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  update(userId: number, user: User) {
    return this.http.put(this.usersUrl + `/${userId}`, user);
  }

  changePassword(userId: number, changePasswordDto: { currentPassword: string, newPassword: string}) {
    return this.http.patch(this.usersUrl + `/${userId}`, changePasswordDto);
  }

  changeProfilePicture(userId: number, picture: FormData) {
    return this.http.post(this.usersUrl + `/${userId}`, picture);
  }

  delete(userId: number) {
    return this.http.delete(this.usersUrl + `/${userId}`);
  }
  
}
