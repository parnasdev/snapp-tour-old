import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThumbnailTourComponent } from './vertical-thumbnail-tour.component';

describe('VerticalThumbnailTourComponent', () => {
  let component: VerticalThumbnailTourComponent;
  let fixture: ComponentFixture<VerticalThumbnailTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalThumbnailTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThumbnailTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
