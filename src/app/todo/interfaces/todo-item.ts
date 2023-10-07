import {TaskStatus} from "../enums/TaskStatus";
import {TaskTag} from "../enums/TaskTag";
import {Priority} from "./priority";

export interface TodoItem {
  id: number,
  name: string,
  description: string,
  dueDate: Date,
  status: TaskStatus,
  tag: TaskTag,
  priority: Priority
}


