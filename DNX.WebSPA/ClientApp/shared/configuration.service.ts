import { IAppConfig } from './app-config/app-config.interface';
import { Injectable }       from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';

import 'rxjs/Rx';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer }         from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject }          from 'rxjs/Subject';


@Injectable()
export class ConfigurationService {
    appConfig: IAppConfig;
    // observable that is fired when settings are loaded from server
    private settingsLoadedSource = new Subject();
    settingsLoaded$ = this.settingsLoadedSource.asObservable();
    isReady: boolean = false;

    constructor(private http: Http) { }
    
    load() {
        const baseURI = document.baseURI != null ? document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/` : "";
        let url = `${baseURI}Home/Configuration`;
        this.http.get(url).subscribe((response: Response) => {
            console.log('server settings loaded');
            this.appConfig = response.json();
            console.log(this.appConfig);
            localStorage.setItem("IdentityServerUrl", this.appConfig.IdentityServerUrl)
            localStorage.setItem("ProductDetailApiUrl", this.appConfig.ProductDetailApiUrl)
            localStorage.setItem("BaseUrl", this.appConfig.BaseUrl)
        });
    }
}
