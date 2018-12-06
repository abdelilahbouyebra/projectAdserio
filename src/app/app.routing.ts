import { Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { ConsultComponent }   from './consultation/consultation.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard'
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ProfileComponent } from './utilisateurs/profile/profile.component';


export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'acceuil',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: AuthComponent
        },
    {
        path: 'acceuil',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'candidats',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'consultation',
        component: ConsultComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', 
         component: DashboardComponent,
         canActivate: [AuthGuard]
     }
]
