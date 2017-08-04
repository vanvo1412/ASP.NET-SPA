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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdIconModule,
    MdCardModule,
} from '@angular/material';
export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
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
                    { path: '', component: FetchDataComponent }
                ],
            },
            { path: '**', redirectTo: 'home' }
        ]),
        NoopAnimationsModule,
        MdButtonModule,
        MdIconModule,
        MdCardModule,
        NavBarModule,
        FooterModule,
        ThemePickerModule,
        SideNavModule
    ]
};
