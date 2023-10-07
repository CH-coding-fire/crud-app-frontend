import {TodoItem} from "./todo-item";

export interface TodoItemCreationDTO extends TodoItem {
  todoGroupId:number
}
