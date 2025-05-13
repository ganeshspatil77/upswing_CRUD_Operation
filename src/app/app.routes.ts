import { Routes } from '@angular/router';
import { TaskFormPageComponent } from './tasks/components/task-form-page/task-form-page.component';
import { TaskListPageComponent } from './tasks/components/task-list-page/task-list-page.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskListPageComponent
    },
    {
        path: '',
        loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule)
    }
];
