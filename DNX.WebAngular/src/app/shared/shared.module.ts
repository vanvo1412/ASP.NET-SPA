import { AppConfig, AppConfigConstant } from './app-config/app-config.constants';
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MenuItems } from "./menu-items/menu-items";
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from "./accordion";
import { ToggleFullscreenDirective } from "./fullscreen/toggle-fullscreen.directive";

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective
  ],
  providers: [
    MenuItems,
    HttpClient,
    {
      provide: AppConfig,
      useValue: AppConfigConstant
    }
  ]
})
export class SharedModule {}
