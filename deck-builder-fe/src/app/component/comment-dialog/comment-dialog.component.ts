import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  commentForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.commentForm = new FormGroup({
      'text': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  comment() {
    this.dialogRef.close(this.commentForm.value.text);
  }

}
