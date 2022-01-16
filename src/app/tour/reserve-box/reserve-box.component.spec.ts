import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBoxComponent } from './reserve-box.component';

describe('ReserveBoxComponent', () => {
  let component: ReserveBoxComponent;
  let fixture: ComponentFixture<ReserveBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
