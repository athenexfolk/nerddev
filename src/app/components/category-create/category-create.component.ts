import { Component, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-category-create',
  imports: [OverlayComponent],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
})
export class CategoryCreateComponent {
  created = output();
  closed = output();
}
