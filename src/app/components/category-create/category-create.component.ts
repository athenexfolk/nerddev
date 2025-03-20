import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-category-create',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
})
export class CategoryCreateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);

  closed = output();

  form = this.#fb.group({
    slug: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  get slug() {
    return this.form.get('slug');
  }

  get name() {
    return this.form.get('name');
  }

  create() {
    if (this.form.invalid) return;

    const slug = this.slug!.value!;
    const name = this.name!.value!;

    this.#contentService.createCategory({ slug, name }).subscribe({
      next: () => this.closed.emit(),
    });
  }
}
