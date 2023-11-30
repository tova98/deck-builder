import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if(!(error.error instanceof ErrorEvent)) {
                this.snackBar.open(error.error.error, "❌", { duration: 5000, panelClass: ['snackbar-warn'], verticalPosition: 'top'});
                if (error.error.error) {
                    if(error.error.error.match("JWT")) {
                        localStorage.removeItem('access_token');
                    }
                }
            }
            return throwError(() => error);
        }));
    }
}