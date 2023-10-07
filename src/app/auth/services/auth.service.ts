import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Team} from "../../team/interfaces/team";
import {HttpClient} from "@angular/common/http";
import {UserCreationDTO} from "../interfaces/user-creation-dto";
import {UserLoginDTO} from "../interfaces/user-login-dto";
import {UserLoginSuccessDTO} from "../interfaces/user-login-success-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,
  ) {}

  authRoute = "auth"
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string| null>(null);
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string| null>(null);
  private teamIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string| null>(null);


  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getRole() {
    return this.roleSubject.asObservable();
  }

  getTeamId(){
    return this.teamIdSubject.asObservable()
  }


  registerUser(user:UserCreationDTO):Observable<any>{
    return this.http.post(`${environment.apiUrl}/${this.authRoute}/register`, user)
  }
  loginUser(user:UserLoginDTO):Observable<UserLoginSuccessDTO>{
    return this.http.post<UserLoginSuccessDTO>(`${environment.apiUrl}/${this.authRoute}/login`, user)
  }

  logoutUser():void{
    this._isAuthenticated.next(false)
    this.clearUserData()

  }
  createLoginDisplayStatus(userLoginSuccessDTO:UserLoginSuccessDTO):void{
    this._isAuthenticated.next(true)
    this.setUserData(userLoginSuccessDTO)
  }

  setUserData(userLoginSuccessDTO:UserLoginSuccessDTO) {
    localStorage.setItem('token', userLoginSuccessDTO.token)
    localStorage.setItem('role', userLoginSuccessDTO.role);
    localStorage.setItem('username', userLoginSuccessDTO.username);
    localStorage.setItem('teamId', userLoginSuccessDTO.teamId.toString())
    this.initUserDataByLocalStorage()
  }

  initUserDataByLocalStorage():void{
    this.usernameSubject.next(localStorage.getItem('username'));
    this.roleSubject.next(localStorage.getItem('role'));
    this.teamIdSubject.next(localStorage.getItem('teamId'))
  }
  clearUserData():void{
    localStorage.clear()
    this.usernameSubject.next(null);
    this.roleSubject.next(null);
  }


}
