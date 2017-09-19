import { IAppConfig } from './app-config.interface';
import { InjectionToken } from "@angular/core";

export const AppConfigConstant: IAppConfig = {
    productDetailApiUrl: "http://localhost:5001",
    identityServerUrl: "http://localhost:5000",
    baseUrl: "http://localhost:5002"
}

export let AppConfig = new InjectionToken<IAppConfig>("app.config")