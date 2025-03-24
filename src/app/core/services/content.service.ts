import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Lesson } from '../models/lesson';
import {
  CreateCategoryDto,
  CreateLessonDto,
  UpdateCategoryDto,
  UpdateLessonContentDto,
  UpdateLessonDto,
} from '../models/dto';
import { CategoryStoreService } from '../stores/category-store.service';
import { tap } from 'rxjs';
import { LessonStoreService } from '../stores/lesson-store.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly categoryStore = inject(CategoryStoreService);
  private readonly lessonStore = inject(LessonStoreService);

  private readonly http = inject(HttpClient);

  loadedCategories = false;
  loadedLessons = false;

  constructor() {
    this.loadCategories();
    this.loadLessons();
  }

  loadCategories() {
    // Prevent new load on loaded
    if (this.loadedCategories) {
      return;
    }
    this.loadedCategories = true;
    this.getCategories().subscribe();
  }

  loadLessons() {
    // Prevent new load on loaded
    if (this.loadedLessons) {
      return;
    }
    this.loadedLessons = true;
    this.getLessons().subscribe();
  }

  clearCategories() {
    this.categoryStore.categories.set([]);
    this.loadedCategories = false;
  }

  clearLessons() {
    this.lessonStore.lessons.set([]);
    this.loadedLessons = false;
  }

  getCategories() {
    return this.http
      .get<Category[]>('api/category')
      .pipe(tap((categories) => this.categoryStore.categories.set(categories)));
  }

  getCategory(id: string) {
    return this.http.get<Category>(`api/category/${id}`);
  }

  getLessons() {
    return this.http
      .get<Lesson[]>('api/lesson')
      .pipe(tap((lessons) => this.lessonStore.lessons.set(lessons)));
  }

  getLesson(id: string) {
    return this.http.get<Lesson>(`api/lesson/${id}`);
  }

  createCategory(dto: CreateCategoryDto) {
    return this.http
      .post<Category>('api/category', dto)
      .pipe(tap((category) => this.categoryStore.add(category)));
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    return this.http
      .put<Category>(`api/category/${id}`, dto)
      .pipe(tap((category) => this.categoryStore.update(category)));
  }

  deleteCategory(id: string) {
    return this.http
      .delete(`api/category/${id}`)
      .pipe(tap(() => this.categoryStore.remove(id)));
  }

  createLesson(dto: CreateLessonDto) {
    return this.http
      .post<Lesson>('api/lesson', dto)
      .pipe(tap((lesson) => this.lessonStore.add(lesson)));
  }

  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.http
      .put<Lesson>(`api/lesson/${id}`, dto)
      .pipe(tap((lesson) => this.lessonStore.update(lesson)));
  }

  updateLessonContent(id: string, dto: UpdateLessonContentDto) {
    return this.http.put<Lesson>(`api/lesson/${id}/content`, dto);
  }

  deleteLesson(id: string) {
    return this.http
      .delete(`api/lesson/${id}`)
      .pipe(tap(() => this.lessonStore.remove(id)));
  }

  exportLesson() {
    this.http
      .get('api/feature/export', { responseType: 'blob', observe: 'response' })
      .subscribe((response) => {
        const blob = response.body!;
        const contentDisposition = response.headers.get('Content-Disposition');

        const filename = this.getFileNameFromContentDisposition(
          contentDisposition,
          'export.zip',
        );

        this.downloadBlob(blob, filename);
      });
  }

  private getFileNameFromContentDisposition(
    contentDisposition: string | null,
    defaultFileName: string,
  ) {
    let filename = defaultFileName;
    if (contentDisposition) {
      let match = contentDisposition.match(/filename\*=UTF-8''(.+?)(;|$)/);
      if (match) {
        filename = decodeURIComponent(match[1]);
      } else {
        match = contentDisposition.match(/filename="?(.+?)"?($|;)/);
        if (match) {
          filename = match[1];
        }
      }
    }

    return filename;
  }

  private downloadBlob(blob: Blob, filename: string) {
    const link = document.createElement('a');
    const downloadURL = URL.createObjectURL(blob);
    link.href = downloadURL;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(downloadURL);
  }
}
