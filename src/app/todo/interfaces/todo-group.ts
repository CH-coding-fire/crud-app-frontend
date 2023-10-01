import {TodoItem} from "./todo-item";

export interface TodoGroup {
  id:string,
  todoGroup: TodoItem[],
  teamId: string,
}
