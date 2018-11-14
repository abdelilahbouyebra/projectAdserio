import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Candidat } from '../models/candidat';

@Component({
  moduleId: module.id,
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
})
export class NotificationComponent implements OnInit {
  listCandidtatVerifDatEmb:Candidat[];

  constructor(private notificationService:NotificationService) { }

  ngOnInit() {
    this.getVerifierDateEmbouche();
  }
  getVerifierDateEmbouche(){
    this.notificationService.getVerifierDateEmbouche()
         .subscribe( 
             res => {
             this.listCandidtatVerifDatEmb = res;
         }
         )
}

}
