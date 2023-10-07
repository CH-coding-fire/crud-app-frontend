import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoGroupFormComponent} from "../todo/components/add-todo-group-form/add-todo-group-form.component";
import {TodoGroupService} from "../todo/services/todo-group.service";
import {TodoGroupCreationDTO} from "../todo/interfaces/todo-group-creation-dto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated$: Observable<boolean> = this.authService.isAuthenticated
  getUsername$: Observable<string | null> = this.authService.getUsername()
  getRole$: Observable<string |null> = this.authService.getRole()
  getTeamId$: Observable<string | null> = this.authService.getTeamId()
  constructor(private authService: AuthService,
              private todoGroupService: TodoGroupService,
              private router: Router,
              public dialog: MatDialog,

  ) {}
  ngOnInit() {
    this.isUserAuthenticated$ = this.authService.isAuthenticated;
  }
  onLogout() {
    localStorage.removeItem('token');
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

  onCreateTodoGroup() {
    const dialogRef = this.dialog.open(AddTodoGroupFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: TodoGroupCreationDTO) => {
      if (result) {
        console.log('The create dialog was closed', result);
        this.todoGroupService.createTodoGroup(result).subscribe(
          data => {
            console.log("Registration successful", data);
            alert("Todo group creation successful")
          },
          (error:HttpErrorResponse) => {
              alert("Todo group creation fail")
            console.error("Registration failed", error);
          })
      }
    });
  }
}
