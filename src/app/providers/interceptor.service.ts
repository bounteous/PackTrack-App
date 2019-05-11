import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { AlertController } from "@ionic/angular";
import { Observable, from, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(private storage: Storage, private alertCtrl: AlertController) {}

  // Intercepts all HTTP requests!
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let promise = this.storage.get("auth-token");

    return from(promise).pipe(
      mergeMap(token => {
        let clonedReq = this.addToken(request, token);
        return next.handle(clonedReq).pipe(
          catchError(error => {
            return throwError(error);
          })
        );
      })
    );
  }

  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
          Authorization: `${token}`
        }
      });
      return clone;
    }

    return request;
  }
}
