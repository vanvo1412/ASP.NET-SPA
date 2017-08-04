"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidenav_1 = require("./components/sidenav/sidenav");
var theme_picker_1 = require("./components/theme-picker");
var footer_module_1 = require("./components/footer/footer.module");
var navbar_module_1 = require("./components/navbar/navbar.module");
var router_1 = require("@angular/router");
var app_component_1 = require("./components/app/app.component");
var home_component_1 = require("./components/home/home.component");
var fetchdata_component_1 = require("./components/fetchdata/fetchdata.component");
var counter_component_1 = require("./components/counter/counter.component");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
exports.sharedConfig = {
    bootstrap: [app_component_1.AppComponent],
    declarations: [
        app_component_1.AppComponent,
        counter_component_1.CounterComponent,
        fetchdata_component_1.FetchDataComponent,
        home_component_1.HomeComponent
    ],
    imports: [
        router_1.RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: home_component_1.HomeComponent },
            {
                path: 'counter', component: sidenav_1.SideNavComponent,
                children: [
                    { path: '', component: counter_component_1.CounterComponent }
                ],
            },
            {
                path: 'fetch-data', component: sidenav_1.SideNavComponent,
                children: [
                    { path: '', component: fetchdata_component_1.FetchDataComponent }
                ],
            },
            { path: '**', redirectTo: 'home' }
        ]),
        animations_1.NoopAnimationsModule,
        material_1.MdButtonModule,
        material_1.MdIconModule,
        material_1.MdCardModule,
        navbar_module_1.NavBarModule,
        footer_module_1.FooterModule,
        theme_picker_1.ThemePickerModule,
        sidenav_1.SideNavModule
    ]
};
//# sourceMappingURL=app.module.shared.js.map