import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingByComponent } from './tracking-by.component';

describe('TrackingByComponent', () => {
  let component: TrackingByComponent;
  let fixture: ComponentFixture<TrackingByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
