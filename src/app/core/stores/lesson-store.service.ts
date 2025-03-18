import { Injectable, signal } from '@angular/core';
import type { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonStoreService {
  lessons = signal<Lesson[]>([]);

  add(lesson: Lesson) {
    this.lessons.update((lessons) => [...lessons, lesson]);
  }

  remove(id: string) {
    this.lessons.update((lessons) => lessons.filter((l) => l.id !== id));
  }

  update(lesson: Lesson) {
    this.lessons.update((lessons) =>
      lessons.map((l) => (l.id === lesson.id ? lesson : l)),
    );
  }
}
