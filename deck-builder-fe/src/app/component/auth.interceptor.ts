import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = this.getToken();

        if(token) {
            request = request.clone({
                setHeaders: { Authorization: "Bearer " + token }
            });
        }
        return next.handle(request);
    }

    getToken() {
        if (localStorage.getItem('access_token')) {
            return localStorage.getItem('access_token');
        } else {
            return undefined;
        }
    }
}