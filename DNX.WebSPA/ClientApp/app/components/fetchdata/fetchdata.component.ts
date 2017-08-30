import { HttpClient } from './../../../shared/app-config/http-client/http-client';
import { ComponentPageTitle } from './../../../shared/page-title/page-title';
import { Component, Inject } from '@angular/core';

import { IAppConfig } from './../../../shared/app-config/app-config.interface';
import { AppConfig } from './../../../shared/app-config/app-config.constants';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public products: Product[];

    constructor(
        http: HttpClient,
        private _componentPageTitle: ComponentPageTitle,
        @Inject(AppConfig) private appConfig: IAppConfig) {

        _componentPageTitle.title = "Fetch data";

        http.get(this.appConfig.API_ENDPOINT + '/api/products').subscribe(result => {
            this.products = result.json() as Product[];
        });
    }

    createProduct(product: Product) {
        
    }
}

interface Product {
    name: string,
    productNumber: string,
    color: string,
    listPrice: number
    thumbnail: string;
}
