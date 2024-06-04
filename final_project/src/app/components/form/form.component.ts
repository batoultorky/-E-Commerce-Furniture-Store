import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;
  users: any;
  user: any;
  flag: any;
  myerror: any;
  errorRegister: any;
  constructor(public UserService: UsersService, public router: Router) {

  }
  ngOnInit(): void {
    this.flag = localStorage.getItem("flag");
    if (this.flag == "true") {
      localStorage.setItem("flag", "false")

      if (localStorage.getItem("goToPage") == "product") {
        localStorage.setItem("goToPage", "")
        this.router.navigate(['/products']);
      }
      else this.router.navigate(['']);
    }
  }
  signUpButtonClick() {
    if (this.container) {
      this.container.nativeElement.classList.add("right-panel-active");
    }
  }

  signInButtonClick() {
    if (this.container) {
      this.container.nativeElement.classList.remove("right-panel-active");
    }
  }

  // Custom validator for name to ensure it is all characters  
  nameFormatValidator(control: FormControl): { [key: string]: any } | null {
    const namePattern = /^[^\d]+$/;
    if (control.value && !namePattern.test(control.value)) {
      return { 'invalidName': true };
    }
    return null;
  }
  // Custom validator function for email format 
  emailFormatValidator(control: FormControl): { [key: string]: any } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }
  // Custom validator function for password format 
  passwordFormatValidator(control: FormControl): { [key: string]: any } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (control.value && !passwordPattern.test(control.value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  //Custom validator function to match password and password confirmation
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  };
  registerForm = new FormGroup({

    fullName: new FormControl('',
      [
        Validators.required,
        this.nameFormatValidator,
        Validators.minLength(3)
      ]
    ),
    email: new FormControl(null,
      [
        Validators.required,
        this.emailFormatValidator
      ]
    ),
    username: new FormControl('',
      [
        Validators.required
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        this.passwordFormatValidator,
      ]
    ),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator
    ]),
  });
  loginForm = new FormGroup({

    email: new FormControl(null,
      [
        Validators.required,
        this.emailFormatValidator
      ]
    ),
    password: new FormControl(null,
      [
        Validators.required,
        this.passwordFormatValidator,
      ]
    )
  });
  get getName() {
    return this.registerForm.controls['fullName'];
  }
  get getEmail() {
    return this.registerForm.controls['email'];
  }
  get getEmail2() {
    return this.loginForm.controls['email'];
  }
  get getPassword() {
    return this.registerForm.controls['password'];
  }
  get getPassword2() {
    return this.loginForm.controls['password'];
  }
  get getPasswordConfirmation() {
    return this.registerForm.controls['confirmPassword'];
  }
  get getUName() {
    return this.registerForm.controls['username'];
  }
  registerHandler(e: any) {
    e.preventDefault();
    console.log("valid", this.registerForm);

    if (this.registerForm.status == 'VALID') {
      console.log("Done");

      console.log(this.registerForm.value)
      this.UserService.AddUser(this.registerForm.value).subscribe({
        next: data => {
          this.user = data;

          localStorage.setItem('usertoken', this.user.token);
          localStorage.setItem('userRole', this.user.roles[0]);
          localStorage.setItem('username', this.user.userName);
          localStorage.setItem('flag', "true");
          if (localStorage.getItem('usertoken') == this.user.token && localStorage.getItem('userRole') == "User") {
            this.router.navigate(['/products']);
          }
          window.location.reload();
        },
        error: (error) => {
          this.errorRegister = error.error;
          console.log("error", error)
        },
      })
    }
    else {
      console.log('Fix Form Errors', this.registerForm);
    }
  }
  loginHandler(e: any) {
    e.preventDefault();
    this.UserService.getlogin({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }).subscribe({
      next: data => {
        this.user = data;
        console.log(this.user);

        localStorage.setItem('usertoken', this.user.token);
        localStorage.setItem('userRole', this.user.roles[0]);
        localStorage.setItem('username', this.user.userName);
        localStorage.setItem('flag', "true");
        if (localStorage.getItem('usertoken') == this.user.token && localStorage.getItem('userRole') == "User") {
          this.router.navigate(['/products']);
        }

        else if (localStorage.getItem('usertoken') == this.user.token && localStorage.getItem('userRole') == "Admin") {
          this.router.navigate(['/admin_page']);
        }

        window.location.reload();


      },
      error: (error) => {
        this.myerror = error.error;
      },
    })
  }

}
