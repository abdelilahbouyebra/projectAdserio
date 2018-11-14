import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { ConsultComponent }   from './consultation/consultation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { CandidatService } from './services/candidat.service';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './notification/notification.component'; 



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    ConsultComponent,
    NotificationComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    HttpModule,
    FormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService,CandidatService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
