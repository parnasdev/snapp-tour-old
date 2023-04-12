import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReserveComponent } from './request-reserve.component';

describe('RequestReserveComponent', () => {
  let component: RequestReserveComponent;
  let fixture: ComponentFixture<RequestReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
