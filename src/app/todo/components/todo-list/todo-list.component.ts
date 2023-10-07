import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from "../../interfaces/todo-item";
import {TodoItemStoreService} from "../../services/todo-item-store.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoFormComponent} from "../add-todo-form/add-todo-form.component";
import {TaskStatus} from "../../enums/TaskStatus";
import {FormControl} from "@angular/forms";
import {TodoGroup} from "../../interfaces/todo-group";
import {TodoItemService} from "../../services/todo-item.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todoGroup!: TodoGroup
  @Output() deleteTodoItemEvent = new EventEmitter<number>
  @Output() editTodoItemEvent = new EventEmitter<TodoItem>
  todoItems$!:Observable<TodoItem[]>

  constructor(public dialog: MatDialog,
              private todoItemStoreService: TodoItemStoreService)
  {}

  ngOnInit(): void {
    this.todoItems$ = this.todoItemStoreService.todoItems$
  }

  onEdit(todoItem: TodoItem) {
    const dialogRef = this.dialog.open(AddTodoFormComponent, {
      data: {todoItem:todoItem, isEditMode:true},
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((todoItem:TodoItem ) => {
      if(todoItem){
        console.log('The edit dialog was closed', todoItem);
        this.editTodoItemEvent.emit(todoItem)
      }
    });
  }
  onDelete(todoItemId:number):void {
    this.deleteTodoItemEvent.emit(todoItemId)
  }



}
