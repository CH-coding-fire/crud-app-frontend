import { Component } from '@angular/core';
import {AddTodoFormComponent} from "../../add-todo-form/add-todo-form.component";
import {TodoItem} from "../../interfaces/todo-item";
import {MatDialog} from "@angular/material/dialog";
import {TodoItemStoreService} from "../../services/todo-item-store.service";

@Component({
  selector: 'app-todo-toolbar',
  templateUrl: './todo-toolbar.component.html',
  styleUrls: ['./todo-toolbar.component.css']
})
export class TodoToolbarComponent {
  constructor(public dialog: MatDialog,
              private todoItemStoreService: TodoItemStoreService) {}
  onCreate() {
    const dialogRef = this.dialog.open(AddTodoFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result:TodoItem) => {
      if(result){
        console.log('The create dialog was closed', result);
        //todo Api call
        //todo Update UI
        this.todoItemStoreService.addTodoItem(result)
      }
    });

  }

  onFilter() {

    // Logic for "Filter" action
  }

  onSort() {
    // Logic for "Sort" action
  }

}
