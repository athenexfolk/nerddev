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
      .pipe(tap(this.categoryStore.categories.set));
  }

  getCategory(id: string) {
    return this.http.get<Category>(`api/category/${id}`);
  }

  getLessons() {
    return this.http
      .get<Lesson[]>('api/lesson')
      .pipe(tap(this.lessonStore.lessons.set));
  }

  getLesson(id: string) {
    return this.http.get<Lesson>(`api/lesson/${id}`);
  }

  createCategory(dto: CreateCategoryDto) {
    return this.http
      .post<Category>('api/category', dto)
      .pipe(tap(this.categoryStore.add));
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    return this.http
      .put<Category>(`api/category/${id}`, dto)
      .pipe(tap(this.categoryStore.update));
  }

  deleteCategory(id: string) {
    return this.http
      .delete(`api/category/${id}`)
      .pipe(tap(() => this.categoryStore.remove(id)));
  }

  createLesson(dto: CreateLessonDto) {
    return this.http
      .post<Lesson>('api/lesson', dto)
      .pipe(tap(this.lessonStore.add));
  }

  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.http
      .put<Lesson>(`api/lesson/${id}`, dto)
      .pipe(tap(this.lessonStore.update));
  }

  updateLessonContent(id: string, dto: UpdateLessonContentDto) {
    return this.http
      .put<Lesson>(`api/lesson/${id}/content`, dto)
      .pipe(tap(this.lessonStore.update));
  }

  deleteLesson(id: string) {
    return this.http
      .delete(`api/lesson/${id}`)
      .pipe(tap(() => this.lessonStore.remove(id)));
  }
}
