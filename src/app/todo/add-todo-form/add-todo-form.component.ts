import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent {
  todoForm: FormGroup = new FormGroup({});
  taskStatus = TaskStatus;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todoItem:TodoItem = this.todoForm.value;
      console.log('Todo Data Submitted:', todoItem);
    }else{
      alert("form is not valid")
    }
  }

}
