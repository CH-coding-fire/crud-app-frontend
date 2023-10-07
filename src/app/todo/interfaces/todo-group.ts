import {TodoItem} from "./todo-item";

export interface TodoGroup {
  id:number,
  name: string,
  teamId: string,
  todoItems: TodoItem[],
}
