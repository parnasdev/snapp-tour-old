import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePopupComponent } from './reserve-popup.component';

describe('ReservePopupComponent', () => {
  let component: ReservePopupComponent;
  let fixture: ComponentFixture<ReservePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
