import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Category } from '../../core/models/category';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-category-update',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
})
export class CategoryUpdateComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);

  category = input.required<Category>();
  closed = output();

  form = this.#fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    ],
  });

  get name() {
    return this.form.get('name');
  }

  ngOnInit() {
    this.form.patchValue({ name: this.category().name });
  }

  update() {
    if (this.form.invalid) return;

    const name = this.name!.value!;

    this.#contentService
      .updateCategory(this.category().id, { name })
      .subscribe({
        next: () => this.closed.emit(),
      });
  }
}
