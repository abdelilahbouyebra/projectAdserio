import { Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { ConsultComponent }   from './consultation/consultation.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard'


export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'acceuil',
        //canActivate:[AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'candidats',
        //canActivate:[AuthGuard],
        component: UserComponent
    },
    {
        path: 'consultation',
        component: ConsultComponent
    }
]
