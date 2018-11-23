import { Component, OnInit } from '@angular/core';
import { LoginService,TokenPayload } from 'app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { }
  credentials: TokenPayload;
  
  ngOnInit() {
    this.credentials = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }
  loginUser(e) {
  	e.preventDefault();
  	
  	var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'admin') {
      this.loginService.setUserLoggedIn();
  		this.router.navigate(['acceuil']);
  	}
  }
  login() {
    this.loginService.login(this.credentials).subscribe(
      () => {
        console.log("okkkkkkkkkkkkkkkkkkkkkkk");
        this.router.navigateByUrl('/candidats')
      },
      err => {
        console.error(err)
      }
    )
  }

}
