import { AppConfig } from "./../shared/app-config/app-config.constants";
import { IAppConfig } from "./../shared/app-config/app-config.interface";
import { getAll } from "./../state/reducers/products";
import { HttpClient } from "./../shared/http-client/http-client";
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class ProductService {
  constructor(
    private httpClient: HttpClient,
    @Inject(AppConfig) private appConfig: IAppConfig
  ) {}
  getAll(take: number) {
    let q = JSON.stringify({
      take: take
    });
    return this.httpClient.get(`${this.appConfig.productDetailApiUrl}/api/products?q=${q}`);
  }
}
