import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";
import {TaskTag} from "../enums/TaskTag";
import {MatDialog} from "@angular/material/dialog";
import {SortingService} from "./sorting.service";
import {TodoGroupService} from "./todo-group.service";
import {TodoItemService} from "./todo-item.service";
import {SortSequence} from "../enums/sort-sequence";

@Injectable({
  providedIn: 'root'
})
export class TodoItemStoreService {
  private _todoItems: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  public todoItems$: Observable<TodoItem[]> = this._todoItems.asObservable();
  public _originalTodoItems:  BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  constructor(private sortingService: SortingService,
  ) {}
  private setOriginalTodoItems(todoItems:TodoItem[]):void{
    this._originalTodoItems.next(todoItems)
  }
  private filterAndSortTodoItems(todoItems: TodoItem[], todoStatus: TaskStatus[], todoTag: TaskTag[], dateSequenceSort: SortSequence, prioritySort: SortSequence): TodoItem[] {
    return this.sortingService.sortByDateSequence(
      this.sortingService.sortByPriority(
        todoItems.filter(item => todoStatus.includes(item.status) && todoTag.includes(item.tag)),
        prioritySort),
      dateSequenceSort);
  }
  setAndFilterTodoItems(unfilteredTodoItems$: Observable<TodoItem[]>, todoStatus: TaskStatus[], todoTag: TaskTag[], dateSequenceSort: SortSequence, prioritySort: SortSequence): void {
    unfilteredTodoItems$
      .subscribe(todoItems => {
        this.setOriginalTodoItems(todoItems); // New: set original items first
        const filteredSortedTodoItems = this.filterAndSortTodoItems(todoItems, todoStatus, todoTag, dateSequenceSort, prioritySort);
        this._todoItems.next(filteredSortedTodoItems);
      });
  }
  filterTodoItems(todoStatus: TaskStatus[], todoTag: TaskTag[], dateSequenceSort: SortSequence, prioritySort: SortSequence): void {
    const originalTodoItems = this._originalTodoItems.getValue();
    const filteredSortedTodoItems = this.filterAndSortTodoItems(originalTodoItems, todoStatus, todoTag, dateSequenceSort, prioritySort);
    this._todoItems.next(filteredSortedTodoItems);
  }
}
