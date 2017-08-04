"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var theme_picker_1 = require("./../theme-picker/theme-picker");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var NavBar = (function () {
    function NavBar() {
    }
    return NavBar;
}());
NavBar = __decorate([
    core_1.Component({
        selector: 'app-navbar',
        templateUrl: './navbar.html',
        styleUrls: ['./navbar.scss']
    })
], NavBar);
exports.NavBar = NavBar;
var NavBarModule = (function () {
    function NavBarModule() {
    }
    return NavBarModule;
}());
NavBarModule = __decorate([
    core_1.NgModule({
        imports: [material_1.MdButtonModule, router_1.RouterModule, theme_picker_1.ThemePickerModule],
        exports: [NavBar],
        declarations: [NavBar],
    })
], NavBarModule);
exports.NavBarModule = NavBarModule;
//# sourceMappingURL=navbar.module.js.map