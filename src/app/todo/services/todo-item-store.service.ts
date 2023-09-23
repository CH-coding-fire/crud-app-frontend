import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";

@Injectable({
  providedIn: 'root'
})
export class TodoItemStoreService {
  taskStatus = TaskStatus;

  sampleItem:TodoItem[] = [
    {id: '1', name: 'Buy sushi', description: 'I am so tired...', dueDate: '2022-03-31', status: this.taskStatus.NotStarted},
    {id: '2', name: 'Do coding problem', description: 'It is so lengthy! I wish I can go other things, such as playing games. Or just relax and watch TV', dueDate: '2024-05-11', status: this.taskStatus.InProgress},
    {id: '3', name: 'Research about red light therapy', description: 'oh, it is for my grandma', dueDate: '2023-01-01', status: this.taskStatus.Completed},
  ]

  private _todoItems: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>(this.sampleItem);

  // Exposed as an observable for subscribers
  public todoItems$: Observable<TodoItem[]> = this._todoItems.asObservable();

  constructor() { }

  getCurrentTodoItems(): TodoItem[] {
    return this._todoItems.value;
  }

  // Update the entire todoItems array
  updateTodoItems(newTodoItems: TodoItem[]): void {
    this._todoItems.next(newTodoItems);
  }

  // Add a single todoItem to the current array
  addTodoItem(newTodoItem: TodoItem): void {
    const currentTodoItems = this._todoItems.value;
    this._todoItems.next([...currentTodoItems, newTodoItem]);
  }
}
