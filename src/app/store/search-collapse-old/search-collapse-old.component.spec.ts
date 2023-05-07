import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollapseOldComponent } from './search-collapse-old.component';

describe('SearchCollapseOldComponent', () => {
  let component: SearchCollapseOldComponent;
  let fixture: ComponentFixture<SearchCollapseOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCollapseOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCollapseOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
