import { environment } from "./../../environments/environment";
import { getAll } from "./../state/reducers/products";
import { HttpClient } from "./../shared/http-client/http-client";
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) {}
  getById(id: number){
    return this.httpClient.get(`${environment.productDetailAPIUrl}/api/products/${id}`);
  }
  getAll(take: number) {
    let q = JSON.stringify({
      take: take
    });
    return this.httpClient.get(`${environment.productDetailAPIUrl}/api/products?q=${q}`);
  }
}
