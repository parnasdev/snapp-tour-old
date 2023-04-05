import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidReservationsListComponent } from './paid-reservations-list.component';

describe('PaidReservationsListComponent', () => {
  let component: PaidReservationsListComponent;
  let fixture: ComponentFixture<PaidReservationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidReservationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidReservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
