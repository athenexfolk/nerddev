import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import type { Lesson } from '../../core/models/lesson';
import { MediaService } from '../../core/services/media.service';
import type { UpdateLessonDto } from '../../core/models/dto';

@Component({
  selector: 'app-lesson-update',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './lesson-update.component.html',
  styleUrl: './lesson-update.component.css',
})
export class LessonUpdateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);
  readonly #mediaService = inject(MediaService);

  lesson = input.required<Lesson>();
  closed = output();

  form = this.#fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    cover: [''],
  });

  get title() {
    return this.form.get('title');
  }

  get cover() {
    return this.form.get('cover');
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.lesson().title,
      cover: this.lesson().cover,
    });
  }

  update() {
    if (this.form.invalid) return;

    const title = this.title!.value!;
    const cover = this.cover?.value;

    let dto: UpdateLessonDto = {
      title,
    };

    if (cover) {
      dto.cover = cover;
    }

    this.#contentService.updateLesson(this.lesson().id, dto).subscribe({
      next: () => this.closed.emit(),
    });
  }

  onFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var file = input.files[0];
      this.#mediaService.upload(file).subscribe({
        next: ({ link }) => {
          this.form.patchValue({ cover: link });
        },
        complete: () => {
          input.value = '';
        },
      });
    }
  }

  clearCover() {
    this.form.patchValue({ cover: '' });
  }
}
