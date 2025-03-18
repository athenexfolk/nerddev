import { Component, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-category-update',
  imports: [OverlayComponent],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
})
export class CategoryUpdateComponent {
  updated = output();
  closed = output();
}
