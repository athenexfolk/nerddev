import { Component, inject, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { CategoryStoreService } from '../../core/stores/category-store.service';

@Component({
  selector: 'app-lesson-create',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.css',
})
export class LessonCreateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);
  readonly categoryStore = inject(CategoryStoreService);

  closed = output();

  form = this.#fb.group({
    slug: ['', [Validators.required]],
    category: ['', [Validators.required]],
    title: ['', [Validators.required]],
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

    this.#contentService.createLesson({ slug, title, categoryId }).subscribe({
      next: () => this.closed.emit(),
    });
  }
}
