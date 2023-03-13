import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyReservesComponent } from './agency-reserves.component';

describe('AgencyReservesComponent', () => {
  let component: AgencyReservesComponent;
  let fixture: ComponentFixture<AgencyReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyReservesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
