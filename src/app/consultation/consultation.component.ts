import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Candidat } from '../models/candidat';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CandidatService } from '../services/candidat.service';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations'



declare interface TableData {
    headerRow: string[];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'consultation.component.html',
    styles:[],
   animations: [
      trigger('myanimation',[
        transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
          ])
      ])
   ]
})

export class ConsultComponent implements OnInit{
    public dataTableCandidat:TableData;
    listCandidat:Candidat[];
    selectedConsultCandidat : Candidat;
    show:boolean = false;

    constructor(private candidatService:CandidatService,private toastr:ToastrService){}

   
    ngOnInit(){
        this.resetForm();
        this.dataTableCandidat={headerRow: ['nom et pr','v.m','etat','actions']};
        this.getAllCandidat();
    }
    resetForm(form?: NgForm) {
        if (form != null)
        form.reset();
        this.selectedConsultCandidat = {
          id: null,
          nom: '',
          prenom: '',
          dateEmbouche:null,
          dateValidCrtSejour:null,
          postOcupe:'',
          dateEntretienInd:null,
          visiteMedical:false,
          entretienIndividuel:false,
          commentaire:'',
          calcDateEmb:0,
          isPeriodEsaiValid:false,
      }
}
    getAllCandidat(){
        this.candidatService.getAllCandidats()
             .subscribe( 
                 resultArray => {
                    this.listCandidat = resultArray;
                    console.log(this.listCandidat);
             }
             )
    }
    showEdit(user: Candidat) {
        this.selectedConsultCandidat= Object.assign({}, user);
      }

    onSubmit(candidatConsultForm){
            this.candidatService.modifierEtatCandidat(candidatConsultForm.value.id, candidatConsultForm.value)
            .subscribe(data => {
              this.getAllCandidat();
              this.toastr.info('SUCCESS', "Candidat  est Modifié");
              this.resetForm(candidatConsultForm);
              this.show=false;
            })
    }

}
