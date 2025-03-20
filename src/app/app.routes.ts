import { Routes } from '@angular/router';
import { CategoryListPage } from './pages/category-list/category-list.page';
import { LessonListPage } from './pages/lesson-list/lesson-list.page';
import { ContentEditorPage } from './pages/content-editor/content-editor.page';
import { PhotosPage } from './pages/photos/photos.page';

export const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListPage,
  },
  {
    path: 'lessons',
    component: LessonListPage,
  },
  {
    path: 'lessons/:lessonId',
    component: ContentEditorPage,
  },
  {
    path: 'photos',
    component: PhotosPage,
  },
];
