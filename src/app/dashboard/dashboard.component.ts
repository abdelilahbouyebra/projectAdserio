import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { NotificationService } from '../services/notification.service';
import { UserService } from 'app/services/user.service';
import { CandidatService } from 'app/services/candidat.service';
import { Candidat } from 'app/models/candidat';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  constructor(private notificationService:NotificationService,
    private candidatService:CandidatService,
    private toastr:ToastrService
    ){}
  countPeriodEssai:any;
  countCartSej:any;
  countEntAnnuel:any;
  afficheDetailCrtSjr:boolean=false;
  affichePerEssai:boolean=false;
  afficheEntreIndivid:boolean=false;


  getVerifierDateEmbouche(){
    this.notificationService.countPeriodEssai()
         .subscribe( 
             res => {
             this.countPeriodEssai = res;
         }
         )
   }
   countValiditeCarteSejour(){
    this.notificationService.countValiditeCarteSejour()
         .subscribe( 
             res => {
                 console.log("countCartSej "+res)
             this.countCartSej = res;
         }
         )
   }
   countDateEntAnnuel(){
    this.notificationService.countDateEntAnnuel()
         .subscribe( 
             res => {
             this.countEntAnnuel = res;
         }
         )
   }

    ngOnInit(){
      this.getVerifierDateEmbouche();
      this.countValiditeCarteSejour();
      this.countDateEntAnnuel();

        // new Chartist.Pie('#chartPreferences', {
        //   labels: ['62%','32%','6%'],
        //   series: [62, 32, 6]
        // });

        // new Chartist.Pie('#chartPreferences2', {
        //   labels: ['62%','32%','6%'],
        //   series: [62, 32, 6]
        // });
    }
    validerPeriodeEssai(candidat:Candidat){
        candidat.isPeriodEsaiValid=true;
        this.candidatService.validerPeriodeEssaiCandidat(candidat)
        .subscribe(data => {
            this.ngOnInit();
          this.toastr.info('SUCCESS', candidat.nom+" est validé");
        })
}

}
