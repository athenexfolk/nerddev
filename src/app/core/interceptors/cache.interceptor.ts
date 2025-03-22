import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';

/* This interceptor use for caching on continuous GET */
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    /* Clear cache on request on changes with server */
    cacheService.httpCaches.clear();
    return next(req);
  }

  const cachedResponse = cacheService.httpCaches.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.httpCaches.set(req.urlWithParams, event);
      }
    }),
  );
};
