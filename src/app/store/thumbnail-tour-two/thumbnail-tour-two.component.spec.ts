import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailTourTwoComponent } from './thumbnail-tour-two.component';

describe('ThumbnailTourTwoComponent', () => {
  let component: ThumbnailTourTwoComponent;
  let fixture: ComponentFixture<ThumbnailTourTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailTourTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailTourTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
