import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { CandidatService } from '../services/candidat.service';
import { NotificationComponent } from '../notification/notification.component';
import { UserComponent }   from '../user/user.component';
import { ConsultComponent }   from '../consultation/consultation.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 



@NgModule({
  declarations: [
    UserComponent,
    ConsultComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers:[UserService,CandidatService,LoginService],

      })
 
export class UserModule { }
