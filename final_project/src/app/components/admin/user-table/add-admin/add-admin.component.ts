import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  /**
   *
   */
  constructor(public userService: UsersService, public router: Router) {

  }
  AdminForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),

  });
  get getFullName() {

    return this.AdminForm.controls['fullName'];
  }
  get getUserName() {

    return this.AdminForm.controls['userName'];
  }
  get getEmail() {

    return this.AdminForm.controls['email'];
  }
  get getPassword() {

    return this.AdminForm.controls['password'];
  }
  get getConfirmPassword() {

    return this.AdminForm.controls['confirmPassword'];
  }
  AdminHand(e: any) {
    if (this.AdminForm.status == 'VALID') {
      this.userService.AddAdmin(this.AdminForm.value).subscribe({

        next: (data) => {

          this.router.navigate(['/admin_page']);
        }

      })

    }
  }
}
