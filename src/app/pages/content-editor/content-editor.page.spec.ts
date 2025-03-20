import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorPage } from './content-editor.page';

describe('ContentEditorPage', () => {
  let component: ContentEditorPage;
  let fixture: ComponentFixture<ContentEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEditorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
