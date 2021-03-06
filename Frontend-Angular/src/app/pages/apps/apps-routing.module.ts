import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: TicketsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
