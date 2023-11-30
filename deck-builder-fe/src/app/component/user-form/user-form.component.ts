import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  isAddMode: boolean = true;
  userForm!: FormGroup;
  roles = Object.values(Role)

  userId: number | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.router.url.startsWith("/edit-user")) {
      this.isAddMode = false;
      this.userId = Number(this.route.snapshot.paramMap.get('id'));
    }

    if(this.router.url.match("edit-profile")) {
      this.isAddMode = false;
      this.userId = this.authService.getCurrentUserId();
    }

    this.userForm = new FormGroup( {
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, this.passwordValidator()),
      'role': new FormControl(null, Validators.required)
    });

    if(!this.isAddMode) {
      this.userService.getUser(this.userId!).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }
  }

  private passwordValidator() {
    return this.isAddMode ? Validators.required : Validators.nullValidator;
  }

  onSubmit() {
    if(this.isAddMode) {
      this.userService.save(this.userForm.value).subscribe(() => this.gotoUserList());
    } else {
      this.userService.update(this.userId!, this.userForm.value).subscribe(() => this.gotoUserList());
    }
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }

}
