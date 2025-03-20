import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import type { Lesson } from '../../core/models/lesson';

@Component({
  selector: 'app-lesson-delete',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './lesson-delete.component.html',
  styleUrl: './lesson-delete.component.css',
})
export class LessonDeleteComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);

  lesson = input.required<Lesson>();
  closed = output();

  form = this.#fb.group({});

  delete() {
    this.#contentService.deleteLesson(this.lesson().id).subscribe({
      next: () => this.closed.emit(),
    });
  }
}
