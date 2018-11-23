import { Component, OnInit } from '@angular/core';
import { Utilisateurs } from 'app/models/utilisateurs';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit {

  constructor(private loginService:LoginService,
    private toastr:ToastrService,
    private router: Router) { }

  selectedUtilisateur: Utilisateurs = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    created:null
  };

  ngOnInit() {
  }

  register(){
    this.loginService.register(this.selectedUtilisateur).subscribe(
      () => {
        this.toastr.success('SUCCESS', "Utilisateur Enregistré avec success");
        //this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }

}
