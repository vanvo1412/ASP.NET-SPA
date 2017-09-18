import { ConfigurationService } from './../shared/configuration.service';
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
        {   provide: 'BASE_URL', useFactory: getBaseUrl },
        {
            provide: AppConfig, useValue: AppConfigConstant
        },
        AuthService,
        AuthGuard,
        HttpClient,
        ConfigurationService
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
