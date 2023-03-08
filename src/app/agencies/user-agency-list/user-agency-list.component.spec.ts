import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgencyListComponent } from './user-agency-list.component';

describe('UserAgencyListComponent', () => {
  let component: UserAgencyListComponent;
  let fixture: ComponentFixture<UserAgencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
