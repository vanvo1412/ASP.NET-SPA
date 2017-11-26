import { environment } from './../../environments/environment.prod';
import { getAll } from "./../state/reducers/products";
import { HttpClient } from "./../shared/http-client/http-client";
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) {}
  getAll(take: number) {
    let q = JSON.stringify({
      take: take
    });
    return this.httpClient.get(`${environment.productDetailAPI}/api/products?q=${q}`);
  }
}
