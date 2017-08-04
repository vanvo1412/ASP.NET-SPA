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
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
var StyleManager = (function () {
    function StyleManager() {
    }
    /**
     * Set the stylesheet with the specified key.
     */
    StyleManager.prototype.setStyle = function (key, href) {
        getLinkElementForKey(key).setAttribute('href', href);
    };
    /**
     * Remove the stylesheet with the specified key.
     */
    StyleManager.prototype.removeStyle = function (key) {
        var existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    };
    return StyleManager;
}());
StyleManager = __decorate([
    core_1.Injectable()
], StyleManager);
exports.StyleManager = StyleManager;
function getLinkElementForKey(key) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}
function getExistingLinkElementByKey(key) {
    return document.head.querySelector("link[rel=\"stylesheet\"]." + getClassNameForKey(key));
}
function createLinkElementWithKey(key) {
    var linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}
function getClassNameForKey(key) {
    return "style-manager-" + key;
}
//# sourceMappingURL=style-manager.js.map