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
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.showShadow = false;
        var previousRoute = router.routerState.snapshot.url;
        router.events.subscribe(function (data) {
            _this.showShadow = data.url.indexOf('/home') != 0 && !(data.url === "/");
            // We want to reset the scroll position on navigation except when navigating within
            // the documentation for a single component.
            if (!isNavigationWithinComponentView(previousRoute, data.url)) {
                resetScrollPosition();
            }
            previousRoute = data.url;
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
function isNavigationWithinComponentView(oldUrl, newUrl) {
    var componentViewExpression = /counter\/(\w+)/;
    return oldUrl && newUrl
        && componentViewExpression.test(oldUrl)
        && componentViewExpression.test(newUrl)
        && oldUrl.match(componentViewExpression)[1] === newUrl.match(componentViewExpression)[1];
}
function resetScrollPosition() {
    if (typeof document === 'object' && document) {
        var sidenavContent = document.querySelector('.mat-sidenav-content');
        if (sidenavContent) {
            sidenavContent.scrollTop = 0;
        }
    }
}
//# sourceMappingURL=app.component.js.map