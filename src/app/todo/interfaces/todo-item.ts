import {TaskStatus} from "../enums/TaskStatus";

export interface TodoItem {
  id: string,
  name: string,
  description: string,
  dueDate: string,
  status: TaskStatus,
}
