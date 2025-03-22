import type { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  httpCaches = new Map<string, HttpResponse<unknown>>();
}
