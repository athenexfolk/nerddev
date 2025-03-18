import { Routes } from '@angular/router';
import { CategoryListPage } from './pages/category-list/category-list.page';
import { LessonListPage } from './pages/lesson-list/lesson-list.page';

export const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListPage,
  },
  {
    path: 'lessons',
    component: LessonListPage,
  },
];
