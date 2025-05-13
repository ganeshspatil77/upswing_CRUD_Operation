import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskChartPageComponent } from './components/task-chart-page/task-chart-page.component';
import { TaskListPageComponent } from './components/task-list-page/task-list-page.component';
import { TaskFormPageComponent } from './components/task-form-page/task-form-page.component';

const routes: Routes = [
  {
    path: 'tasks-charts',
    component:TaskChartPageComponent
  },
   {
    path: 'tasks-list',
    component:TaskListPageComponent
  },
    {
    path: 'tasks-form',
    component:TaskFormPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
