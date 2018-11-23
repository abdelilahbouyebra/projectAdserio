import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export interface UserDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}
interface TokenResponse {
  token: string
}
export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}
@Injectable()
export class LoginService {
  public isUserLoggedIn;
  public username;
    private token: string

  
    baseUrl:String="http://localhost:8081/";
  constructor(private http: HttpClient,private router: Router) { 
  	this.isUserLoggedIn = false;
  }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
    this.username = 'admin';
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.baseUrl+'users/login', user)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
