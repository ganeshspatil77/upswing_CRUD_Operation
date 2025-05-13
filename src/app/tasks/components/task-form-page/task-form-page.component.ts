import { Component, effect } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TasksStore } from '../../store/task.store';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-page.component.html',
  styleUrl: './task-form-page.component.scss'
})
export class TaskFormPageComponent {
  form: any = {}
  selectedTask: any;


  constructor(private fb: FormBuilder, private store: TasksStore, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: ['InProgress'],
      createdAt: [this.getTodayDateString(), Validators.required]
    });
    this.selectedTask = this.store.selectedTask;

    effect(() => {
      const task = this.selectedTask(); // must call the signal
      if (task) {
        this.form.setValue({ title: task.title, status: task.status });
      }
    });
  }



  onSubmit() {
    if (this.form.valid) {
 
      const editing = this.selectedTask();
      const { title, status, createdAt } = this.form.value;
      if (editing) {
        this.store.updateTask({ ...editing, title: title!, status: status!, createdAt:createdAt! });
        this.form.reset({ title: '', status: 'InProgress' });
        this.router.navigate(['tasks-list']);
      } else {
        this.store.addTask(title!, status!,  createdAt!);
        this.form.reset({ title: '', status: 'InProgress' });
        this.router.navigate(['tasks-list']);
      }
    }
  }

  getTodayDateString(): string {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000);
  return localDate.toISOString().substring(0, 10);
}

}
