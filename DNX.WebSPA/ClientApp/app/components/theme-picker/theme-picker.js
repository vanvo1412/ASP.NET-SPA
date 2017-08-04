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
var style_manager_1 = require("../style-manager/style-manager");
var theme_storage_1 = require("./theme-storage/theme-storage");
var material_1 = require("@angular/material");
var common_1 = require("@angular/common");
var ThemePicker = (function () {
    function ThemePicker(styleManager, _themeStorage) {
        this.styleManager = styleManager;
        this._themeStorage = _themeStorage;
        // themes = [
        //   {
        //     primary: '#673AB7',
        //     accent: '#FFC107',
        //     href: 'deeppurple-amber.css',
        //     isDark: false,
        //   },
        //   {
        //     primary: '#3F51B5',
        //     accent: '#E91E63',
        //     href: 'indigo-pink.css',
        //     isDark: false,
        //     isDefault: true,
        //   },
        //   {
        //     primary: '#E91E63',
        //     accent: '#607D8B',
        //     href: 'pink-bluegrey.css',
        //     isDark: true,
        //   },
        //   {
        //     primary: '#9C27B0',
        //     accent: '#4CAF50',
        //     href: 'purple-green.css',
        //     isDark: true,
        //   },
        // ];
        this.themes = [
            {
                primary: '#673AB7',
                accent: '#FFC107',
                href: 'deeppurpleAmber.css',
                isDark: false,
            },
            {
                primary: '#3F51B5',
                accent: '#E91E63',
                href: 'indigoPink.css',
                isDark: false,
                isDefault: true,
            },
            {
                primary: '#E91E63',
                accent: '#607D8B',
                href: 'pinkBluegrey.css',
                isDark: true,
            },
            {
                primary: '#9C27B0',
                accent: '#4CAF50',
                href: 'purpleGreen.css',
                isDark: true,
            },
        ];
        var currentTheme = this._themeStorage.getStoredTheme();
        if (currentTheme) {
            this.installTheme(currentTheme);
        }
    }
    ThemePicker.prototype.installTheme = function (theme) {
        this.currentTheme = this._getCurrentThemeFromHref(theme.href);
        if (theme.isDefault) {
            this.styleManager.removeStyle('theme');
        }
        else {
            this.styleManager.setStyle('theme', "dist/" + theme.href);
        }
        if (this.currentTheme) {
            this._themeStorage.storeTheme(this.currentTheme);
        }
    };
    ThemePicker.prototype._getCurrentThemeFromHref = function (href) {
        return this.themes.find(function (theme) { return theme.href === href; });
    };
    return ThemePicker;
}());
ThemePicker = __decorate([
    core_1.Component({
        selector: 'theme-picker',
        templateUrl: 'theme-picker.html',
        styleUrls: ['theme-picker.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        encapsulation: core_1.ViewEncapsulation.None,
        host: { 'aria-hidden': 'true' },
    }),
    __metadata("design:paramtypes", [style_manager_1.StyleManager,
        theme_storage_1.ThemeStorage])
], ThemePicker);
exports.ThemePicker = ThemePicker;
var ThemePickerModule = (function () {
    function ThemePickerModule() {
    }
    return ThemePickerModule;
}());
ThemePickerModule = __decorate([
    core_1.NgModule({
        imports: [
            material_1.MdButtonModule,
            material_1.MdIconModule,
            material_1.MdMenuModule,
            material_1.MdGridListModule,
            material_1.MdTooltipModule,
            common_1.CommonModule
        ],
        exports: [ThemePicker],
        declarations: [ThemePicker],
        providers: [style_manager_1.StyleManager, theme_storage_1.ThemeStorage],
    })
], ThemePickerModule);
exports.ThemePickerModule = ThemePickerModule;
//# sourceMappingURL=theme-picker.js.map