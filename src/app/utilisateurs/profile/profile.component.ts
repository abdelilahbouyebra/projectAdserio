import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Utilisateurs } from 'app/models/utilisateurs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  details:Utilisateurs;

  ngOnInit() {
    this.loginService.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

}
