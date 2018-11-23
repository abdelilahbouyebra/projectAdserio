import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './services/notification.service';
import { AuthComponent } from './auth/auth.component'; 
import { AuthGuard } from './auth.guard';
import {UserModule} from './user/user.module'
import { TemplateModule } from './shared/template.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { NguiMapModule} from '@ngui/map';
import { FormsModule } from '@angular/forms';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProfileComponent } from './utilisateurs/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UtilisateursComponent,
    ProfileComponent
      ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    UserModule,
    TemplateModule,
    SidebarModule,
    NguiMapModule.forRoot(),
    NavbarModule,
    FooterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NotificationService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
