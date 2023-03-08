import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserPopupComponent } from './set-user-popup.component';

describe('SetUserPopupComponent', () => {
  let component: SetUserPopupComponent;
  let fixture: ComponentFixture<SetUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
