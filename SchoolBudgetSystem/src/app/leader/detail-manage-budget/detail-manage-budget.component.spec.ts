import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManageBudgetComponent } from './detail-manage-budget.component';

describe('DetailManageBudgetComponent', () => {
  let component: DetailManageBudgetComponent;
  let fixture: ComponentFixture<DetailManageBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailManageBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailManageBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
