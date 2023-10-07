import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Team} from "../../../team/interfaces/team";
import {TeamService} from "../../../team/services/team.service";
import {TodoGroupCreationDTO} from "../../interfaces/todo-group-creation-dto";

@Component({
  selector: 'app-add-todo-group-form',
  templateUrl: './add-todo-group-form.component.html',
  styleUrls: ['./add-todo-group-form.component.css']
})
export class AddTodoGroupFormComponent implements OnInit{
  todoGroupForm: FormGroup = new FormGroup({});
  teams$: Observable<Team[]> = new Observable<Team[]>

  constructor(private fb: FormBuilder,
              private teamService: TeamService,
              public dialogRef: MatDialogRef<AddTodoGroupFormComponent>
  ){}

  ngOnInit():void{
    this.todoGroupForm = this.fb.group({
      name:[null, Validators.required],
      teamId:[null, Validators.required]
    })
    this.teams$ = this.teamService.getTeams()
  }

  onSubmit() {
    this.dialogRef.close(this.todoGroupForm.value as TodoGroupCreationDTO)
  }
}
