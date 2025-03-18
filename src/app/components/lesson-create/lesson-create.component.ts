import { Component, output } from '@angular/core';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-lesson-create',
  imports: [OverlayComponent],
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.css',
})
export class LessonCreateComponent {
  created = output();
  closed = output();
}
