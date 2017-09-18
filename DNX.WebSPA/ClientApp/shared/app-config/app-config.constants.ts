import { IAppConfig } from './app-config.interface';
import { InjectionToken } from "@angular/core";

export const AppConfigConstant: IAppConfig = {
    ProductDetailApiUrl: "http://localhost:5001",
    IdentityServerUrl: "http://localhost:5000",
    BaseUrl: "http://localhost:5002"
}

export let AppConfig = new InjectionToken<IAppConfig>("app.config")