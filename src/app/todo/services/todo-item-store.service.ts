import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";
import {TaskTag} from "../enums/TaskTag";

@Injectable({
  providedIn: 'root'
})
export class TodoItemStoreService {
  taskStatus = TaskStatus;

  sampleItem:TodoItem[] = [
    {id: '1', name: 'Buy sushi', description: 'I am so tired...', dueDate: new Date(2023, 11, 24,13,0), status: this.taskStatus.NotStarted, tag: TaskTag.errend, priority:2},
    {id: '2', name: 'Do coding problem', description: 'It is so lengthy! I wish I can go other things, such as playing games. Or just relax and watch TV', dueDate: new Date(2024, 8, 24,15,0), status: this.taskStatus.InProgress, tag: TaskTag.errend, priority:3},
    {id: '3', name: 'Research about red light therapy', description: 'oh, it is for my grandma', dueDate: new Date(2023, 8, 4,20,0), status: this.taskStatus.Completed, tag: TaskTag.errend, priority:1},
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
