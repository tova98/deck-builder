import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.changePasswordForm = new FormGroup({
      'currentPassword': new FormControl(null, this.currentPasswordValidator()),
      'newPassword': new FormControl(null, Validators.required)
    });
  }

  currentPasswordValidator() {
    return this.data.admin ? Validators.nullValidator : Validators.required;
  }

  ngOnInit(): void {
  }

  changePassword() {
    this.dialogRef.close(this.changePasswordForm.value);
  }

}
