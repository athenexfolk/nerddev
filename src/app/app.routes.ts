import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/category-list/category-list.page').then(
        (c) => c.CategoryListPage,
      ),
  },
  {
    path: 'lessons',
    loadComponent: () =>
      import('./pages/lesson-list/lesson-list.page').then(
        (c) => c.LessonListPage,
      ),
  },
  {
    path: 'lessons/:lessonId',
    loadComponent: () =>
      import('./pages/content-editor/content-editor.page').then(
        (c) => c.ContentEditorPage,
      ),
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('./pages/photos/photos.page').then((c) => c.PhotosPage),
  },
];
