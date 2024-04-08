import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: 'Home page'
},
{
    path: '**',
    redirectTo: '/' 
}
];