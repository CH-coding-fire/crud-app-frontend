import { Injectable } from '@angular/core';
import {SortSequence} from "../enums/sort-sequence";
import {TodoItem} from "../interfaces/todo-item";

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sortByDateSequence(filteredItems: TodoItem[], sequence: SortSequence): TodoItem[] {
    switch (sequence) {
      case SortSequence.Ascending:
        return filteredItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      case SortSequence.Descending:
        return filteredItems.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
      case SortSequence.None:
      default:
        return filteredItems;
    }
  }

  sortByPriority(filteredItems: TodoItem[], sequence: SortSequence): TodoItem[] {
    switch (sequence) {
      case SortSequence.Ascending:
        return filteredItems.sort((a, b) => a.priority - b.priority);
      case SortSequence.Descending:
        return filteredItems.sort((a, b) => b.priority - a.priority);
      case SortSequence.None:
      default:
        return filteredItems;
    }
  }


}
