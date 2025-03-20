import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { Category } from '../../core/models/category';

@Component({
  selector: 'app-category-delete',
  imports: [OverlayComponent, ReactiveFormsModule],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css',
})
export class CategoryDeleteComponent {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);

  category = input.required<Category>();
  closed = output();

  form = this.#fb.group({});

  delete() {
    this.#contentService.deleteCategory(this.category().id).subscribe({
      next: () => this.closed.emit(),
    });
  }
}
