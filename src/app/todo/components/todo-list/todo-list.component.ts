import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from "../../interfaces/todo-item";
import {TodoItemStoreService} from "../../services/todo-item-store.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoFormComponent} from "../add-todo-form/add-todo-form.component";
import {TaskStatus} from "../../enums/TaskStatus";
import {FormControl} from "@angular/forms";
import {TodoGroup} from "../../interfaces/todo-group";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() filteredSortedTodoItems: TodoItem[] = []
  @Input() todoGroup!: TodoGroup


  constructor(private todoItemStoreService: TodoItemStoreService,
              public dialog: MatDialog,)
  {}

  ngOnInit(): void {
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
