import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChartPageComponent } from './task-chart-page.component';

describe('TaskChartPageComponent', () => {
  let component: TaskChartPageComponent;
  let fixture: ComponentFixture<TaskChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskChartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
