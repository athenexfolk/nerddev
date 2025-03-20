import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import type { Lesson } from '../../core/models/lesson';

@Component({
  selector: 'app-lesson-update',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './lesson-update.component.html',
  styleUrl: './lesson-update.component.css',
})
export class LessonUpdateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);

  lesson = input.required<Lesson>();
  closed = output();

  form = this.#fb.group({
    title: ['', [Validators.required]],
  });

  get title() {
    return this.form.get('title');
  }

  ngOnInit() {
    this.form.patchValue({ title: this.lesson().title });
  }

  update() {
    if (this.form.invalid) return;

    const title = this.title!.value!;

    this.#contentService.updateLesson(this.lesson().id, { title }).subscribe({
      next: () => this.closed.emit(),
    });
  }
}
