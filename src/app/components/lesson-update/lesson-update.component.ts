import { Component, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-lesson-update',
  imports: [OverlayComponent],
  templateUrl: './lesson-update.component.html',
  styleUrl: './lesson-update.component.css',
})
export class LessonUpdateComponent {
  updated = output();
  closed = output();
}
