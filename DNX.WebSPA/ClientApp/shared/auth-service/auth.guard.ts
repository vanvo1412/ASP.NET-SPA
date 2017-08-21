import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let isLoggedIn = this.authService.isLoggedIn();
        isLoggedIn.subscribe((isLoggedIn) => {
            console.debug('AuthorizationCheck', `Authenticated ${isLoggedIn}`);
            if (!isLoggedIn) {
                this.authService.startSigninMainWindow();
            }
        })

        return isLoggedIn;
    }

}