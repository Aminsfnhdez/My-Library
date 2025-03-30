import { Routes } from '@angular/router';
import { AnteroomsComponent } from './components/anterooms/anterooms.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'anterooms',
        pathMatch: 'full'
    },
    {
        path: 'anterooms',
        component: AnteroomsComponent,
    }
];
