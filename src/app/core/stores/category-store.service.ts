import { Injectable, signal } from '@angular/core';
import type { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService {
  categories = signal<Category[]>([]);

  add(category: Category) {
    this.categories.update((categories) => [...categories, category]);
  }

  remove(id: string) {
    this.categories.update((categories) =>
      categories.filter((c) => c.id !== id),
    );
  }

  update(category: Category) {
    this.categories.update((categories) =>
      categories.map((c) => (c.id === category.id ? category : c)),
    );
  }
}
