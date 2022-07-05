import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCommentPopupComponent } from './answer-comment-popup.component';

describe('AnswerCommentPopupComponent', () => {
  let component: AnswerCommentPopupComponent;
  let fixture: ComponentFixture<AnswerCommentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerCommentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCommentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
