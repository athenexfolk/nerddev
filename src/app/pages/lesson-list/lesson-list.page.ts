import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { LessonStoreService } from '../../core/stores/lesson-store.service';
import { LessonCreateComponent } from '../../components/lesson-create/lesson-create.component';
import { LessonDeleteComponent } from '../../components/lesson-delete/lesson-delete.component';
import { LessonUpdateComponent } from '../../components/lesson-update/lesson-update.component';
import { Toggler } from '../../shared/utils/toggler';
import type { Lesson } from '../../core/models/lesson';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson-list',
  imports: [
    LessonCreateComponent,
    LessonDeleteComponent,
    LessonUpdateComponent,
    RouterLink
  ],
  templateUrl: './lesson-list.page.html',
  styleUrl: './lesson-list.page.css',
})
export class LessonListPage {
  readonly #contentService = inject(ContentService);
  readonly lessonStore = inject(LessonStoreService);

  createPanel = new Toggler();
  updatePanel = new Toggler();
  deletePanel = new Toggler();

  focusLesson?: Lesson;

  ngOnInit() {
    this.#contentService.loadLessons();
  }

  openUpdatePanel(lesson: Lesson) {
    this.updatePanel.up();
    this.focusLesson = lesson;
  }

  closeUpdatePanel() {
    this.updatePanel.down();
    this.focusLesson = undefined;
  }

  openDeletePanel(lesson: Lesson) {
    this.deletePanel.up();
    this.focusLesson = lesson;
  }

  closeDeletePanel() {
    this.deletePanel.down();
    this.focusLesson = undefined;
  }
}
