import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoItem} from "../../interfaces/todo-item";
import {TaskStatus} from "../../enums/TaskStatus";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { v4 as uuidv4 } from 'uuid';
import {TaskTag} from "../../enums/TaskTag";

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class
AddTodoFormComponent implements OnInit{

  todoForm: FormGroup = new FormGroup({});
  taskStatus = TaskStatus;
  taskTag = TaskTag;



  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddTodoFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { todoItem?: TodoItem, isEditMode:boolean },
              ) {}

  ngOnInit(): void {
    const todoItem = this.data.todoItem
    this.todoForm = this.fb.group({
      id: [todoItem?.id ?? '',],
      name: [todoItem?.name ?? '', Validators.required],
      description: [todoItem?.description ?? ''],
      dueDate: [todoItem?.dueDate ?? '', Validators.required],
      status: [todoItem?.status ?? '', Validators.required],
      tag: [todoItem?.tag ?? '', Validators.required],
      priority: [todoItem?.priority ?? '', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close( this.todoForm.value)
  }

}
