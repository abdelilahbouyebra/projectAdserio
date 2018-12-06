import { Component, OnInit } from '@angular/core';
import { LoginService,TokenPayload } from 'app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService,private toastr:ToastrService) { }
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

  login() {
    this.loginService.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/acceuil')
      },
      err => {
        this.toastr.info('ERREUR', "Login ou le mot de passe est incorrete");
        console.error(err)
      }
    )
  }

}
