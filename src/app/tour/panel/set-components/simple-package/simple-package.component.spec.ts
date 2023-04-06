import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePackageComponent } from './simple-package.component';

describe('SimplePackageComponent', () => {
  let component: SimplePackageComponent;
  let fixture: ComponentFixture<SimplePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
