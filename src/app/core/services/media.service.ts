import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);

  photos = signal<string[]>([]);

  loadedPhotos = false;

  constructor() {
    this.loadPhotos();
  }

  loadPhotos() {
    if (this.loadedPhotos) {
      return;
    }
    this.loadedPhotos = true;
    this.getPhotos().subscribe((photos) => this.photos.set(photos));
  }

  getPhotos() {
    return this.http.get<string[]>('api/feature/photos');
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{ link: string }>('api/feature/upload', formData)
      .pipe(
        tap(({ link }) => {
          this.photos.update((p) => [...p, link]);
        }),
      );
  }
}
