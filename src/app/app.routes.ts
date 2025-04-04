import { Routes } from '@angular/router';
import { AnteroomsComponent } from './components/anterooms/anterooms.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LicenceComponent } from './components/licence/licence.component';
import { NextAdquisitionsComponent } from './components/next-adquisitions/next-adquisitions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { InfoComponent } from './components/info/info.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'prev',
        pathMatch: 'full'
    },
    {
        path: 'prev',
        component: AnteroomsComponent,
    },
    {
        path: 'inicio',
        component: HomeComponent,
    },
    {
        path: 'acerca-de',
        component: AboutComponent
    },
    {
        path: 'contactame',
        component: ContactComponent
    },
    {
        path: 'licencia',
        component: LicenceComponent
    },
    {
        path:'proxima-adquisicion',
        component: NextAdquisitionsComponent
    },
    {
        path: 'politica-de-privacidad',
        component: PrivacyPolicyComponent
    },
    {
        path: 'informacion',
        component: InfoComponent,
    }
];
