import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireTourComponent } from './expire-tour.component';

describe('ExpireTourComponent', () => {
  let component: ExpireTourComponent;
  let fixture: ComponentFixture<ExpireTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpireTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
