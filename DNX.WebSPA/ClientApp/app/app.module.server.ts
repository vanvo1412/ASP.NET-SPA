import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';

import { AppConfig, AppConfigConstant } from './../shared/app-config/app-config.constants';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ],
    providers: [
        {
            provide: AppConfig, useValue: AppConfigConstant
        } 
    ]
})
export class AppModule { 
}
