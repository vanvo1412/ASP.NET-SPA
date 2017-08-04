"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ThemeStorage = ThemeStorage_1 = (function () {
    function ThemeStorage() {
        this.onThemeUpdate = new core_1.EventEmitter();
    }
    ThemeStorage.prototype.storeTheme = function (theme) {
        try {
            window.localStorage[ThemeStorage_1.storageKey] = JSON.stringify(theme);
        }
        catch (e) { }
        this.onThemeUpdate.emit(theme);
    };
    ThemeStorage.prototype.getStoredTheme = function () {
        try {
            return JSON.parse(window.localStorage[ThemeStorage_1.storageKey] || null);
        }
        catch (e) {
            return null;
        }
    };
    ThemeStorage.prototype.clearStorage = function () {
        try {
            window.localStorage.removeItem(ThemeStorage_1.storageKey);
        }
        catch (e) { }
    };
    return ThemeStorage;
}());
ThemeStorage.storageKey = 'docs-theme-storage-current';
ThemeStorage = ThemeStorage_1 = __decorate([
    core_1.Injectable()
], ThemeStorage);
exports.ThemeStorage = ThemeStorage;
var ThemeStorage_1;
//# sourceMappingURL=theme-storage.js.map