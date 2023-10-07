import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Team} from "../interfaces/team";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http:HttpClient) {
  }
  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${environment.apiUrl}/Team`)
  }
  getTeamInfoById(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${environment.apiUrl}/Team/${teamId}`);
  }
  createTeam(team:Team){
    return this.http.post(`${environment.apiUrl}/Team`, team)
  }
}
