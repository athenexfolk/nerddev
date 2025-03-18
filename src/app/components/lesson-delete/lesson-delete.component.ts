import { Component, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-lesson-delete',
  imports: [OverlayComponent],
  templateUrl: './lesson-delete.component.html',
  styleUrl: './lesson-delete.component.css',
})
export class LessonDeleteComponent {
  deleted = output();
  closed = output();
}
