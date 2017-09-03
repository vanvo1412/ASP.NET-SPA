import { AuthService } from './../shared/auth-service/auth.service';
import { AuthGuard } from './../shared/auth-service/auth.guard';
import { AppComponent } from './components/app/app.component';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';

import { AppConfig, AppConfigConstant } from './../shared/app-config/app-config.constants';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    providers: [
        {
            provide: AppConfig, useValue: AppConfigConstant
        },
        AuthService,
        AuthGuard, 
    ]
})
export class AppModule { 
}
