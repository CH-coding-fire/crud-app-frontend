import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef} from "@angular/material/dialog";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit {
  createTeamForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateTeamFormComponent>,
  ){}

  ngOnInit(): void {
    this.createTeamForm = this.fb.group({
      id: [uuidv4()],
      teamName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close( this.createTeamForm.value)
  }
}
