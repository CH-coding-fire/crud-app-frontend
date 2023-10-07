import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserLoginDTO} from "../interfaces/user-login-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserLoginSuccessDTO} from "../interfaces/user-login-success-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value as UserLoginDTO).subscribe(
      (res: UserLoginSuccessDTO) => {
        console.log("Login successful", res);
        this.authService.createLoginDisplayStatus(res)
        alert("Registration successful, you will be directed to to todo page")
        this.router.navigate(['/todos']);
      },
      (error: HttpErrorResponse) => {
        alert("Username or password is wrong, please try again")
        console.error("Login fail", error);
      }
    )
  }
}
