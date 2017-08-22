import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './../shared/auth-service/auth.guard';
import { SideNavComponent, SideNavModule } from './components/sidenav/sidenav';
import { ThemePickerModule } from './components/theme-picker';
import { FooterModule } from './components/footer/footer.module';
import { NavBarModule } from './components/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './components/login/login.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    MdInputModule
} from '@angular/material';

const routeConfig = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'counter', component: SideNavComponent,
        children: [
            { path: '', component: CounterComponent }
        ],
    },
    {
        path: 'fetch-data', component: SideNavComponent,
        children: [
            { path: '', component: FetchDataComponent, canActivate: [AuthGuard] }
        ],
    },

    { path: '**', redirectTo: 'home' }
];

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routeConfig),
        NoopAnimationsModule,
        MdButtonModule,
        MdIconModule,
        MdCardModule,
        MdInputModule,
        NavBarModule,
        FooterModule,
        ThemePickerModule,
        SideNavModule,
        ReactiveFormsModule
    ]
};
