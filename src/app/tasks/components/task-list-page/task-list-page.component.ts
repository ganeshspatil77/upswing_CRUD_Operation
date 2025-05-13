import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksStore } from '../../store/task.store';
import { Router } from '@angular/router';
import { TaskChartPageComponent } from '../task-chart-page/task-chart-page.component';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-list-page',
  imports: [FormsModule, CommonModule, TaskChartPageComponent],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss'
})
export class TaskListPageComponent {
  showConfirmation: boolean = false;
  constructor(public store: TasksStore, private router: Router) { }


  goToPage(page: string) {
    this.router.navigate([page]);
  }

  updateTask(updatedTask: Task) {
    this.store.selectTask(updatedTask);
    this.router.navigate(['tasks-form']);
  }

  deleteId:string = ''

  deletaTask(taskId: string) {
    this.showConfirmation = true;
    this.deleteId = taskId;
  }

  confirmDelete(){
    this.showConfirmation = false;
    this.store.deleteTask(this.deleteId);
  }

  closeConfirmationPopup(){
    this.showConfirmation = false;
  }
}
