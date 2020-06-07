// I create this interceptor based
// on this medium article : https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

// This interceptor is used to inject user token + auth header in each http request
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }
}
