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

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);

  getCategories() {
    return this.http.get<Category[]>('api/category');
  }

  getCategory(id: string) {
    return this.http.get<Category>(`api/category/${id}`);
  }

  getLessons() {
    return this.http.get<Lesson[]>('api/lesson');
  }

  getLesson(id: string) {
    return this.http.get<Lesson>(`api/lesson/${id}`);
  }

  createCategory(dto: CreateCategoryDto) {
    return this.http.post<Category>('api/category', dto);
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    return this.http.put<Category>(`api/category/${id}`, dto);
  }

  deleteCategory(id: string) {
    return this.http.delete(`api/category/${id}`);
  }

  createLesson(dto: CreateLessonDto) {
    return this.http.post<Lesson>('api/lesson', dto);
  }

  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.http.put<Lesson>(`api/lesson/${id}`, dto);
  }

  updateLessonContent(id: string, dto: UpdateLessonContentDto) {
    return this.http.put<Lesson>(`api/lesson/${id}/content`, dto);
  }

  deleteLesson(id: string) {
    return this.http.delete(`api/lesson/${id}`);
  }
}
