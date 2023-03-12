import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestToursComponent } from './newest-tours.component';

describe('NewestToursComponent', () => {
  let component: NewestToursComponent;
  let fixture: ComponentFixture<NewestToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
