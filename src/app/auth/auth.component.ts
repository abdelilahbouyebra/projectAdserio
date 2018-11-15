import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
  }
  loginUser(e) {
  	e.preventDefault();
  	
  	var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'admin') {
      this.loginService.setUserLoggedIn();
  		//this.router.navigate(['acceuil']);
  	}
  }

}
