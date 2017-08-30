import { LoginComponent } from './../../app/components/login/login.component';
import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, User, Log } from 'oidc-client';
import { Observable } from "rxjs";

const settings: any = {
    //Required properties
    authority: 'http://localhost:5000',
    client_id: 'spa',
    redirect_uri: 'http://localhost:5002/signin-callback.html',
    response_type: 'id_token token',
    scope: 'openid profile productdetail',

    silent_redirect_uri: 'http://localhost:5002/silent-renew-callback.html',
    post_logout_redirect_uri: 'http://localhost:5002',

    automaticSilentRenew: true,
    accessTokenExpiringNotificationTime: 10,
    silentRequestTimeout: 10000,

    filterProtocolClaims: true,
    loadUserInfo: false,
};

@Injectable()
export class AuthService {

    userManager: UserManager = new UserManager(settings);
    userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
    currentUser: User;
    loggedIn = false;

    authHeaders: Headers;

    constructor(private router: Router) {
        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    this.loggedIn = true;
                    // this.appState.setUser(user);
                    this.currentUser = user;
                    this.userLoadededEvent.emit(user);
                    // this.appState.authenticate(true);
                } else {
                    this.loggedIn = false;
                }
            })
            .catch((reason) => {
                this.loggedIn = false;
            })

        this.userManager.events.addUserLoaded((user) => {
            this.currentUser = user;
            // this.appState.setUser(user);
            // this.appState.authenticate(true);
            console.log('authService addUserLoaded', user);
        })

        this.userManager.events.addUserUnloaded((e) => {
            // this.appState.authenticate(false);
            console.log('user unloaded');
            this.loggedIn = false;
        });

        this.userManager.events.addAccessTokenExpired((e) => {
            this.startSigninMainWindow();
        });

        this.userManager.events.addUserSignedOut((e) => {
            this.signOut();
        });

        this.userManager.events.addUserUnloaded((e) => {
            // this.appState.authenticate(false);
            console.log('user unloaded');
            this.loggedIn = false;
        });
    }

    isLoggedIn(): Observable<boolean> {
        return Observable
            .fromPromise(this.userManager.getUser())
            .map<User, boolean>((user) => {
                if (user) return true;
                return false;
            })
    }


    startSigninMainWindow(): any {
        this.userManager.signinRedirect({ data: 'some data' }).then(function () {
            console.log('signinRedirect done');
        }).catch(function (err) {
            console.log(err);
        });
    }

    signIn() {
        this.userManager.signinRedirect().then(function () {
        }).catch(function (err) {
            console.log(err);
        });
    }

    signOut() {
        this.userManager.signoutRedirect().then(function () {
        }).catch(function (err) {
            console.log(err);
        });
        this.loggedIn = false;
        this.userManager.clearStaleState();
    };
}

