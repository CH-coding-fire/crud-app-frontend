import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TodoGroupCreationDTO} from "../interfaces/todo-group-creation-dto";
import {Observable} from "rxjs";
import {TodoGroup} from "../interfaces/todo-group";
import {environment} from "../../../environments/environment";

const BASE_route = `${environment.apiUrl}/todoGroup`
@Injectable({
  providedIn: 'root'
})
export class TodoGroupService {


  constructor(private http:HttpClient,
  ) {}

  createTodoGroup(todoGroupCreationDTO: TodoGroupCreationDTO ):Observable<any>{
    const url = BASE_route
    return this.http.post(url, todoGroupCreationDTO)
  }

  getTodoGroup():Observable<TodoGroup[]>{
    const url = BASE_route
    return this.http.get<TodoGroup[]>(url)
  }

  getTodoGroupById(todoGroupId: number): Observable<TodoGroup> {
    const url = `${BASE_route}/${todoGroupId}`;
    const params:HttpParams = new HttpParams().set('todoGroupId', todoGroupId);
    return this.http.get<TodoGroup>(url, {params});
  }
}
