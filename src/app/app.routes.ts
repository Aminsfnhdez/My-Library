import { Routes } from '@angular/router';
import { AnteroomsComponent } from './components/anterooms/anterooms.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LicenceComponent } from './components/licence/licence.component';
import { NextAdquisitionsComponent } from './components/next-adquisitions/next-adquisitions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'anterooms',
        pathMatch: 'full'
    },
    {
        path: 'anterooms',
        component: AnteroomsComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'licence',
        component: LicenceComponent
    },
    {
        path:'next-adquisitions',
        component: NextAdquisitionsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    }
];
