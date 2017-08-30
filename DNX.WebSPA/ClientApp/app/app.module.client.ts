import { HttpClient } from './../shared/app-config/http-client/http-client';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppConfig, AppConfigConstant } from './../shared/app-config/app-config.constants';
import { AuthService } from './../shared/auth-service/auth.service';
import { AuthGuard } from './../shared/auth-service/auth.guard';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        ...sharedConfig.imports

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
