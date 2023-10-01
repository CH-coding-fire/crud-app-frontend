import { Pipe, PipeTransform } from '@angular/core';
import {TodoItem} from "../interfaces/todo-item";
import {TaskStatus} from "../enums/TaskStatus";

@Pipe({
  name: 'filterByCondition'
})
export class FilterByConditionPipe implements PipeTransform {

  transform(todoItems: TodoItem[] | null  , taskStatus: TaskStatus[]): TodoItem[] {
    if(!todoItems) return []

    const statusFilteredItems = todoItems.filter((item:TodoItem)=>{
      return taskStatus.includes(item.status)
    })

    return statusFilteredItems;
  }

}
