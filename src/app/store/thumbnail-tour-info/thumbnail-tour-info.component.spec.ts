import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailTourInfoComponent } from './thumbnail-tour-info.component';

describe('ThumbnailTourInfoComponent', () => {
  let component: ThumbnailTourInfoComponent;
  let fixture: ComponentFixture<ThumbnailTourInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailTourInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailTourInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
