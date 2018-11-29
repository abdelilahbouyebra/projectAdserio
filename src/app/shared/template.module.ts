import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [    
    DashboardComponent
  ],
  
  exports:[]
})
export class TemplateModule { }
