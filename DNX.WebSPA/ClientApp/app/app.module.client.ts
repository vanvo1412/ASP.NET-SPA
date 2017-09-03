import { AppComponent } from './components/app/app.component';
import { HttpClient } from './../shared/app-config/http-client/http-client';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppConfig, AppConfigConstant } from './../shared/app-config/app-config.constants';
import { AuthService } from './../shared/auth-service/auth.service';
import { AuthGuard } from './../shared/auth-service/auth.guard';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModuleShared
    ],
    providers: [
        {
            provide: 'ORIGIN_URL', useValue: "http://localhost:5002/",
        },
        {
            provide: 'FLICKR_KEY', useValue: 'bc195b432b6b3e561d1bc5a6db8618b1'
        },
        {
            provide: 'FLICKR_SECRET', useValue: 'c3fd6eadc64e486b'
        },
        {   provide: 'BASE_URL', useFactory: getBaseUrl },
        {
            provide: AppConfig, useValue: AppConfigConstant
        },
        AuthService,
        AuthGuard,
        HttpClient
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
