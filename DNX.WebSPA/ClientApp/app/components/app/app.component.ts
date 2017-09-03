import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    showShadow = false;
    constructor(router: Router) {
        let previousRoute = router.routerState.snapshot.url;

        router.events.subscribe((data: NavigationStart) => {
            this.showShadow = data.url.indexOf('/home') != 0 && !(data.url === "/");

            // We want to reset the scroll position on navigation except when navigating within
            // the documentation for a single component.
            if (!isNavigationWithinComponentView(previousRoute, data.url)) {
                resetScrollPosition();
            }

            previousRoute = data.url;
        });
    }
}

function isNavigationWithinComponentView(oldUrl: string, newUrl: string) {
    const componentViewExpression = /counter\/(\w+)/;
    return oldUrl && newUrl
        && componentViewExpression.test(oldUrl)
        && componentViewExpression.test(newUrl)
        && oldUrl.match(componentViewExpression)![1] === newUrl.match(componentViewExpression)![1];
}

function resetScrollPosition() {
    if (typeof document === 'object' && document) {
        const sidenavContent = document.querySelector('.mat-sidenav-content');
        if (sidenavContent) {
            sidenavContent.scrollTop = 0;
        }
    }
}
