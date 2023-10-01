import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoItem} from "../../interfaces/todo-item";
import {TaskStatus} from "../../enums/TaskStatus";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit{

  todoForm: FormGroup = new FormGroup({});
  taskStatus = TaskStatus;
  isEditMode:boolean = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddTodoFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TodoItem,) {}

  ngOnInit(): void {
    console.log(this.data)
    this.todoForm = this.fb.group({
      id: [uuidv4()],
      name: [this.data?.name ?? '', Validators.required],
      description: [this.data?.description ?? ''],
      dueDate: [this.data?.dueDate ?? '', Validators.required],
      status: [this.data?.status ?? '', Validators.required]
    });
  }

  onSubmit() {
    this.dialogRef.close( this.todoForm.value)
  }

  protected readonly onsubmit = onsubmit;
}
