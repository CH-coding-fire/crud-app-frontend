import {Component, OnInit} from '@angular/core';
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoItems: TodoItem[] = [
    {
      name: 'Sample Task',
      description: 'This is a sample task description.',
      dueDate: '2023-10-01',
      status: TaskStatus.NotStarted
    },
    {
      name: 'Sample Task',
      description: 'This is a sample task description.',
      dueDate: '2023-10-01',
      status: TaskStatus.NotStarted
    },
    {
      name: 'Sample Task',
      description: 'This is a sample task description.',
      dueDate: '2023-10-01',
      status: TaskStatus.NotStarted
    }
    // ... you can add more sample todos here
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
