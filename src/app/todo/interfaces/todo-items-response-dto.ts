import {TodoItem} from "./todo-item";

export interface TodoItemsResponseDTO {
  message:string,
  todoItems:TodoItem[]
}
