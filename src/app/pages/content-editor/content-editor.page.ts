import {
  Component,
  inject,
  input,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import type { Lesson } from '../../core/models/lesson';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedService } from '../../core/services/marked.service';
import { Subject } from 'rxjs/internal/Subject';
import type { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { Toggler } from '../../shared/utils/toggler';
import { PhotosPage } from "../photos/photos.page";

@Component({
  selector: 'app-content-editor',
  imports: [FormsModule, OverlayComponent, ReactiveFormsModule, PhotosPage],
  templateUrl: './content-editor.page.html',
  styleUrl: './content-editor.page.css',
})
export class ContentEditorPage {
  readonly #fb = inject(FormBuilder);
  readonly #contentService = inject(ContentService);
  readonly #markedService = inject(MarkedService);

  form = this.#fb.group({});

  lessonId = input.required<string>();
  mdRef = viewChild.required<ElementRef<HTMLElement>>('md');
  lesson?: Lesson;
  content = '';

  parseSubject = new Subject<void>();
  parseSubscription!: Subscription;

  confirmPanel = new Toggler();
  photoPanel = new Toggler();

  ngOnInit() {
    this.#contentService.getLesson(this.lessonId()).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.content = lesson.content ?? '';
        this.parse();
      },
    });

    this.parseSubscription = this.parseSubject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.parse();
      });
  }

  ngOnDestroy() {
    if (this.parseSubscription) {
      this.parseSubscription.unsubscribe();
    }
  }

  parse() {
    this.#markedService.parse(this.mdRef().nativeElement, this.content);
  }

  parseWithDebounce() {
    this.parseSubject.next();
  }

  saveChanges() {
    this.#contentService
      .updateLessonContent(this.lessonId(), { content: this.content })
      .subscribe({
        next: () => {
          this.confirmPanel.down();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
