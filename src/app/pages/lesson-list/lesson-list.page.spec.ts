import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListPage } from './lesson-list.page';

describe('LessonListPage', () => {
  let component: LessonListPage;
  let fixture: ComponentFixture<LessonListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
