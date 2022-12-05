import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LOCAL_STORAGE } from '../../constant/local.constant';
import { LANGUAGE_VI } from '../../constant/base.constant';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  urlsToNotUse = ['/authenticate', './assets/i18n/vi.json', './assets/i18n/en.json'];
  constructor(
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      !request ||
      (request.url && this.urlsToNotUse.includes(request.url)) || request?.url.includes("/public")
    ) {
      return next.handle(request);
    }
    const token =
      this.localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) || this.sessionStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN);
      const lang = this.localStorage.retrieve(LOCAL_STORAGE.LANGUAGE) || LANGUAGE_VI;
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${token}`,
          language: lang,
          'Accept-Language': lang
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          language: lang,
          'Accept-Language': lang
        },
      });
    }
    return next.handle(request);
  }
}
