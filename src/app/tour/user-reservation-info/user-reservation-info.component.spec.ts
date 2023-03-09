import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationInfoComponent } from './user-reservation-info.component';

describe('UserReservationInfoComponent', () => {
  let component: UserReservationInfoComponent;
  let fixture: ComponentFixture<UserReservationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
