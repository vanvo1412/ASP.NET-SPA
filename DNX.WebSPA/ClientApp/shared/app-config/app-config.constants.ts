import { IAppConfig } from './app-config.interface';
import { InjectionToken } from "@angular/core";

export const AppConfigConstant: IAppConfig = {
    API_ENDPOINT: "http://localhost:5001"
}

export let AppConfig = new InjectionToken<IAppConfig>("app.config")