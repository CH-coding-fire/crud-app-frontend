import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../interfaces/team";

@Injectable({
  providedIn: 'root'
})



export class TeamService {
  apiRoute= "api/"
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.apiRoute+'teams')
  }
}
