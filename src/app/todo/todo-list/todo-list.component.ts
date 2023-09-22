import {Component, OnInit} from '@angular/core';
import {TodoItem} from "../interfaces/todo-item";
import {TodoItemStoreService} from "../services/todo-item-store.service";
import {Observable} from "rxjs";
import {AddTodoFormComponent} from "../add-todo-form/add-todo-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoItems$: Observable<TodoItem[]> | undefined;

  constructor(private todoItemStoreService: TodoItemStoreService,
              public dialog: MatDialog,
              )
  {}

  ngOnInit(): void {
    this.todoItems$ = this.todoItemStoreService.todoItems$
  }

  onEdit(todoItem: TodoItem) {
    const dialogRef = this.dialog.open(AddTodoFormComponent, {
      data: todoItem,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result:TodoItem ) => {
      if(result){
        console.log('The edit dialog was closed', result);
        //todo Api call
        //todo Update UI
        this.todoItemStoreService.addTodoItem(result)
      }

    });

  }

  onDelete() {

  }
}
