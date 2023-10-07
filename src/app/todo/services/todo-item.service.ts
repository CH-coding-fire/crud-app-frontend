import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItemCreationDTO} from "../interfaces/todo-item-creation-dto";
import {TodoItem} from "../interfaces/todo-item";
import {TodoGroup} from "../interfaces/todo-group";
import {TodoItemsResponseDTO} from "../interfaces/todo-items-response-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private todoItemRoute = "todoItem"
  private url = `${environment.apiUrl}/${this.todoItemRoute}`
  constructor(private http: HttpClient) {
  }
  createTodoItem(todoItem: TodoItem, todoGroupId: number): Observable<TodoItemsResponseDTO> {
    const todoItemCreationDTO: TodoItemCreationDTO = {...todoItem, todoGroupId: todoGroupId}
    return this.http.post<TodoItemsResponseDTO>(this.url, todoItemCreationDTO)
  }
  editTodoItem(todoItem: TodoItem): Observable<TodoItemsResponseDTO> {
    return this.http.put<TodoItemsResponseDTO>(this.url, todoItem)
  }
  deleteTodoItem(todoItedId: number): Observable<TodoItemsResponseDTO> {
    const params: HttpParams = new HttpParams().set('todoItemId', todoItedId);
    return this.http.delete<TodoItemsResponseDTO>(this.url, {params});
  }
}
