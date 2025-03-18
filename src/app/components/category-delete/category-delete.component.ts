import { Component, output } from '@angular/core';
import { OverlayComponent } from "../../shared/components/overlay/overlay.component";

@Component({
  selector: 'app-category-delete',
  imports: [OverlayComponent],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent {
  deleted = output();
  closed = output();
}
