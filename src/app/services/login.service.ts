import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  public isUserLoggedIn;
  public username;


  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
  	this.isUserLoggedIn = true;
    this.username = 'admin';
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

}
