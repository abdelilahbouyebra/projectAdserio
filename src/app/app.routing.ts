import { Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { ConsultComponent }   from './consultation/consultation.component';


export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'acceuil',
        pathMatch: 'full',
    },
    {
        path: 'acceuil',
        component: DashboardComponent
    },
    {
        path: 'candidats',
        component: UserComponent
    },
    {
        path: 'consultation',
        component: ConsultComponent
    }
]
