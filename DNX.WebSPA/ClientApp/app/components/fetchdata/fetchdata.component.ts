import { ComponentPageTitle } from './../../../shared/page-title/page-title';
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public products: Product[];

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string, private _componentPageTitle: ComponentPageTitle) {
        _componentPageTitle.title = "Fetch data";

        http.get(originUrl + 'api/products').subscribe(result => {
            console.log(result);
            this.products = result.json() as Product[];
        });
    }
}

interface Product {
    name: string,
    productNumber: string,
    color: string,
    listPrice: number
    thumbnail: string;
}
