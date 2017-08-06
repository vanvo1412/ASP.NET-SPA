import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
            provide: 'ORIGIN_URL', useValue: "http://localhost:5001/",
        },
        {
            provide: 'FLICKR_KEY', useValue: 'bc195b432b6b3e561d1bc5a6db8618b1'
        },
        {
            provide: 'FLICKR_SECRET', useValue: 'c3fd6eadc64e486b'
        }
    ]
})
export class AppModule {
}
