import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStoreService } from '../backend/services/token-store.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private tokenStore: TokenStoreService,
    private translate: TranslateService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Only add authorization if we're calling our own apis
    if (!request.url.startsWith('https://diwanet.com/public/api/'))
      return next.handle(request);
    // add authorization header with jwt token if available
    if (this.tokenStore.accessToken) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${this.tokenStore.accessToken}`,
        },
      });
    }

    let lang = this.translate.currentLang;
    if (lang) {
      lang = lang.replace(/['"]+/g, '');
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Accept-Language': lang,
        },
      });

    }
    return next.handle(request);
  }
}
