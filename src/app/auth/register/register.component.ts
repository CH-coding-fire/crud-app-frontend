import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../team/services/team.service";
import {Observable} from "rxjs";
import {Team} from "../../team/interfaces/team";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({})
  teams$: Observable<Team[]> = new Observable<Team[]>
  constructor(private fb: FormBuilder,
              private teamService: TeamService,
              private authService:AuthService,
              private router: Router
  ){}
  ngOnInit():void{
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      teamId: [null, Validators.required],
      role:[null, Validators.required]
    })
    this.teams$ = this.teamService.getTeams()
  }
  onSubmit() {
    this.authService.registerUser(this.registerForm.value).subscribe(
      data => {
        console.log("Registration successful", data);
        alert("Registration successful, you will be directed to to login page")
        this.router.navigate(['/auth/login']);
      },
      (error:HttpErrorResponse) => {
        if(error.error.message === "Username already exists"){
          alert("Username already exists, please use another username")
        }
        console.error("Registration failed", error);
      }
    )
  }
}
