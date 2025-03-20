import { Component, inject, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { CategoryStoreService } from '../../core/stores/category-store.service';
import type { CreateLessonDto } from '../../core/models/dto';
import { MediaService } from '../../core/services/media.service';

@Component({
  selector: 'app-lesson-create',
  imports: [OverlayComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.css',
})
export class LessonCreateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);
  readonly categoryStore = inject(CategoryStoreService);
  readonly #mediaService = inject(MediaService);

  closed = output();

  form = this.#fb.group({
    slug: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.pattern(/^[a-z][a-z0-9-]*[a-z]$/),
      ],
    ],
    category: ['', [Validators.required]],
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
    cover: [''],
  });

  get slug() {
    return this.form.get('slug');
  }

  get category() {
    return this.form.get('category');
  }

  get title() {
    return this.form.get('title');
  }

  get cover() {
    return this.form.get('cover');
  }

  ngOnInit() {
    this.form.patchValue({
      category: this.categoryStore.categories()[0].id || '',
    });
  }

  create() {
    if (this.form.invalid) return;

    const slug = this.slug!.value!;
    const categoryId = this.category!.value!;
    const title = this.title!.value!;

    const cover = this.cover?.value;

    let dto: CreateLessonDto = {
      title,
      slug,
      categoryId,
    };

    if (cover) {
      dto.cover = cover;
    }

    this.#contentService.createLesson(dto).subscribe({
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
