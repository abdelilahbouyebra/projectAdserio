import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Candidat } from '../models/candidat';
import { ToastrService } from 'ngx-toastr'
import {NgForm} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../services/notification.service';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
})

export class UserComponent implements OnInit{

    users:Candidat[];
    usersList:Candidat[];
    candidat:Candidat[]=[];
    selectedCandidat : Candidat;
    listCandidtatVerifDatEmb:Candidat[];


    fileToUpload: File = null;
    imageUrl: string = "";
    constructor(
          private userService:UserService,
          private toastr:ToastrService,
          private notificationService:NotificationService
        ){}

    ngOnInit(){
        this.resetForm();
        this.getAllCandidat();
        this.notificationService.getVerifierDateEmbouche();
        this.getVerifierDateEmbouche();

    }
    getAllCandidat(){
        this.userService.getAllCandidats()
             .subscribe( 
                 resultArray => {
                 this.usersList = resultArray;
             }
             )
    }
    resetForm(form?: NgForm) {
        if (form != null)
          form.reset();
          this.selectedCandidat = {
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
    
    onSubmit(form: NgForm) {
        console.log(form.value)
          this.userService.addCandidat(form.value)
            .subscribe(data => {
              this.resetForm(form);
              this.getAllCandidat();
              this.getVerifierDateEmbouche();
              this.toastr.success('SUCCESS', "Candidat est Enregistré");
            })
      
    }
  getVerifierDateEmbouche(){
      this.notificationService.getVerifierDateEmbouche()
           .subscribe( 
               res => {
               this.listCandidtatVerifDatEmb = res;
           }
           )
     }
  onDelete(user: Candidat) {
        if (confirm('Are you sure to delete this record ?') == true) {
          this.userService.deleteCandidat(user.id)
          .subscribe(x => {
            this.getAllCandidat();
            this.toastr.warning("SUCCESS","Candidat "+user.nom+" est Supprimé");
          })
        }
      }
      
      showForEdit(user: Candidat) {
        this.selectedCandidat= Object.assign({}, user);
      }
      handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    
        //Show image preview
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
      }
     
}
