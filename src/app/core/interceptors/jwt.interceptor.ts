import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = sessionStorage.getItem("accessToken");
      const isApiUrl = request.url.startsWith(environment.apiPath);
      if(token && isApiUrl){
          request = request.clone({
              setHeaders: {Authorization: `Bearer ${token}`}
          });
      }
      return next.handle(request);
  }
}
