"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
var ComponentPageTitle = (function () {
    function ComponentPageTitle() {
        this._title = '';
    }
    Object.defineProperty(ComponentPageTitle.prototype, "title", {
        get: function () { return this._title; },
        set: function (title) { this._title = title; },
        enumerable: true,
        configurable: true
    });
    return ComponentPageTitle;
}());
ComponentPageTitle = __decorate([
    core_1.Injectable()
], ComponentPageTitle);
exports.ComponentPageTitle = ComponentPageTitle;
//# sourceMappingURL=page-title.js.map