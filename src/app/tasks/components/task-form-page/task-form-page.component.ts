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
      status: ['InProgress']
    });
    this.selectedTask = this.store.selectedTask;

    effect(() => {
      const task = this.selectedTask(); // must call the signal
      if (task) {
        this.form.setValue({ title: task.title, status: task.status });
      }
    });
  }


  ngOnInit() {

  }

  upldate() {

  }



  onSubmit() {
    if (this.form.valid) {
      // const { title, status } = this.form.value;
      // this.store.addTask(title!, status!);
      // this.form.reset({ title: '', status: 'InProgress' });
      // this.router.navigate(['tasks-list']);

      const editing = this.selectedTask();
      const { title, status } = this.form.value;
      if (editing) {
        this.store.updateTask({ ...editing, title: title!, status: status! });
        this.form.reset({ title: '', status: 'InProgress' });
        this.router.navigate(['tasks-list']);
      } else {
        this.store.addTask(title!, status!);
        this.form.reset({ title: '', status: 'InProgress' });
        this.router.navigate(['tasks-list']);
      }
    }
  }

}
