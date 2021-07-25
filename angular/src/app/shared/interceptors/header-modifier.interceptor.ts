import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()
export class HeaderModifierInterceptor implements HttpInterceptor {

  constructor(private auth: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const headers = {
    //   'content-type':'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': '*',
    //   'access_key':this.auth.getAccessToken()!
    // }
    const modifiedRequest = request.clone({
      headers: request.headers.set('content-type','application/json').set('access_key',this.auth.getAccessToken()||'Unauthorized')
    })
    return next.handle(modifiedRequest);
  }
}
