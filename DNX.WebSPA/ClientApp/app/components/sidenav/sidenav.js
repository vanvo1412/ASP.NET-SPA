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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var footer_module_1 = require("./../footer/footer.module");
var page_header_1 = require("./../page-header/page-header");
var sidenav_items_1 = require("./../../../shared/sidenav-items/sidenav-items");
var core_2 = require("@angular/core");
var SMALL_WIDTH_BREAKPOINT = 840;
var SideNavComponent = (function () {
    function SideNavComponent(sideNavItems, _router, _platformId) {
        this.sideNavItems = sideNavItems;
        this._router = _router;
        this.isBrowser = common_1.isPlatformBrowser(_platformId);
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._router.events.subscribe(function () {
            if (_this.isScreenSmall()) {
                _this.sidenav.close();
            }
        });
    };
    SideNavComponent.prototype.isScreenSmall = function () {
        if (this.isBrowser) {
            return window.matchMedia("(max-width: " + SMALL_WIDTH_BREAKPOINT + "px)").matches;
        }
        return false;
    };
    return SideNavComponent;
}());
__decorate([
    core_1.ViewChild(material_1.MdSidenav),
    __metadata("design:type", material_1.MdSidenav)
], SideNavComponent.prototype, "sidenav", void 0);
SideNavComponent = __decorate([
    core_1.Component({
        selector: 'app-sidenav',
        templateUrl: './sidenav.html',
        styleUrls: ['./sidenav.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __param(2, core_1.Inject(core_2.PLATFORM_ID)),
    __metadata("design:paramtypes", [sidenav_items_1.SideNavItems, router_1.Router, String])
], SideNavComponent);
exports.SideNavComponent = SideNavComponent;
var SideNavModule = (function () {
    function SideNavModule() {
    }
    return SideNavModule;
}());
SideNavModule = __decorate([
    core_1.NgModule({
        imports: [material_1.MdSidenavModule, router_1.RouterModule, common_1.CommonModule, page_header_1.PageHeaderModule, footer_module_1.FooterModule],
        exports: [SideNavComponent],
        declarations: [SideNavComponent],
        providers: [sidenav_items_1.SideNavItems],
    })
], SideNavModule);
exports.SideNavModule = SideNavModule;
//# sourceMappingURL=sidenav.js.map