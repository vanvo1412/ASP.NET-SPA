import { AuthService } from './../../auth-service/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';

@Injectable()
export class HttpClient {
    constructor(private http: Http, private authService: AuthService) { }

    addAuthorizationHeader(headers: Headers) {
        let accessToken = this.authService.currentUser.access_token
        headers.append("Authorization", "Bearer " + accessToken)
    }

    get(url: string) {
        let headers = new Headers()
        this.addAuthorizationHeader(headers);

        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: any) {
        let headers = new Headers()
        this.addAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        })
    }
}