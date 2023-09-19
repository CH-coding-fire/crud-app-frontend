import {TaskStatus} from "../enums/TaskStatus";

export interface TodoItem {
  name: string,
  description: string,
  dueDate: string,
  status: TaskStatus,
}
