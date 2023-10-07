import {Component, ViewChild} from '@angular/core';
import {TaskStatus} from "./enums/TaskStatus";
import {TodoItem} from "./interfaces/todo-item";
import {TodoToolbarComponent} from "./components/todo-toolbar/todo-toolbar.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @ViewChild(TodoToolbarComponent) todoToolbarComponent!: TodoToolbarComponent;

  filteredSortedTodoItems: TodoItem[] = []

  onFilteredSortedTodoItems(filteredItems: TodoItem[]) {
    this.filteredSortedTodoItems = filteredItems
  }

  onDeleteTodoItemEvent(todoItemId:number):void{
    this.todoToolbarComponent.onDeleteTodoItem(todoItemId)
  }


  onEditTodoItemEvent(todoItem: TodoItem) {
    this.todoToolbarComponent.onEditTodoItem(todoItem)
  }
}
