import { Component } from '@angular/core';
import {TaskStatus} from "./enums/TaskStatus";
import {TodoItem} from "./interfaces/todo-item";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  filteredSortedTodoItems: TodoItem[] = []
  onFilteredSortedTodoItems(filteredItems: TodoItem[]) {
    this.filteredSortedTodoItems = filteredItems
  }


}
