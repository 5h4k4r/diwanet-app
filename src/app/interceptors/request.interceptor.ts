import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStoreService } from '../backend/services/token-store.service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private tokenStore: TokenStoreService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Only add authorization if we're calling our own apis
    if (!request.url.startsWith('/'))
      return next.handle(request);
    // add authorization header with jwt token if available
    if (this.tokenStore.accessToken) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${this.tokenStore.accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
