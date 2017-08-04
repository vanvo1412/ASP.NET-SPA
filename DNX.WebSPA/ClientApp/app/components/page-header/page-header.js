"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/first");
var page_title_1 = require("./../../../shared/page-title/page-title");
var material_1 = require("@angular/material");
var PageHeaderComponent = (function () {
    function PageHeaderComponent(_componentPageTitle) {
        this._componentPageTitle = _componentPageTitle;
        this.toggleSidenav = new core_1.EventEmitter();
    }
    PageHeaderComponent.prototype.getTitle = function () {
        return this._componentPageTitle.title;
    };
    return PageHeaderComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PageHeaderComponent.prototype, "toggleSidenav", void 0);
PageHeaderComponent = __decorate([
    core_1.Component({
        selector: 'page-header',
        templateUrl: './page-header.html',
        styleUrls: ['./page-header.scss']
    }),
    __metadata("design:paramtypes", [page_title_1.ComponentPageTitle])
], PageHeaderComponent);
exports.PageHeaderComponent = PageHeaderComponent;
var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    return PageHeaderModule;
}());
PageHeaderModule = __decorate([
    core_1.NgModule({
        imports: [material_1.MdButtonModule, material_1.MdIconModule],
        exports: [PageHeaderComponent],
        declarations: [PageHeaderComponent],
        providers: [page_title_1.ComponentPageTitle],
    })
], PageHeaderModule);
exports.PageHeaderModule = PageHeaderModule;
//# sourceMappingURL=page-header.js.map