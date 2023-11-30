import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { faTrashCan, faPen, faKey } from '@fortawesome/free-solid-svg-icons';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;
  faKey = faKey;

  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
  }

  changeUserPassword(userId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      admin: true
    };
    let dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((changePasswordDto: { currentPassword: string, newPassword: string}) => {
      if(changePasswordDto) {
        this.userService.changePassword(userId, changePasswordDto).subscribe(() => {
          this.snackBar.open("Password changed successfully!", "✔️", { duration: 3000, panelClass: ['snackbar-success'], verticalPosition: 'top'});
        });
      }
    });
  }

  delete(userId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'user',
      id: userId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((userId: number) => {
      if(userId) {
        this.userService.delete(userId).subscribe(() => {
          this.users = this.users.filter(u => u.id !== userId);
        })
      }
    })
  }

}
