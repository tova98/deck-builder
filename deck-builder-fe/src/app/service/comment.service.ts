import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDto } from '../dto/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl: string;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.commentsUrl = 'http://localhost:8080/api/comment';
  }

  save(comment: CommentDto) {
    return this.http.post<User>(this.commentsUrl, comment);
  }

  delete(commentId: number) {
    return this.http.delete(this.commentsUrl + `/${commentId}`);
  }
  
}
