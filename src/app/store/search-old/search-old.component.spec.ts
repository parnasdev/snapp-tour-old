import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOldComponent } from './search-old.component';

describe('SearchOldComponent', () => {
  let component: SearchOldComponent;
  let fixture: ComponentFixture<SearchOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
