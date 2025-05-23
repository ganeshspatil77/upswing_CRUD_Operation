import { Injectable, computed, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Task } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class TasksStore {

  private readonly _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  _selectedTask = signal<Task | null>(null);
  selectedTask = this._selectedTask.asReadonly();

  readonly inProgressCount = computed(() =>
    this._tasks().filter(t => t.status === 'InProgress').length
  );

  readonly doneCount = computed(() =>
    this._tasks().filter(t => t.status === 'Done').length
  );

  readonly toDoCount = computed(() =>
    this._tasks().filter(t => t.status === 'ToDo').length
  );

  addTask(title: string, status: Task['status'],  createdAt: Date) {
    const task: Task = {
      id: uuid(),
      title,
      status,
      createdAt
    };

    this._tasks.update(tasks => [...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    this._tasks.update(tasks =>
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  deleteTask(id: string) {
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  readonly taskTrends = computed(() => {
    const counts: { [date: string]: number } = {};
    this._tasks().forEach((task: any) => {
      const day = task.createdAt.toISOString().split('T')[0];
      counts[day] = (counts[day] || 0) + 1;
    });
    
    return counts;
  });

  readonly tasksPerDay = computed(() => {
    const map = new Map<string, number>();
    for (const task of this._tasks()) {
      if (task.createdAt) {
        const day = new Date(task.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
        map.set(day, (map.get(day) || 0) + 1);
      }

    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  });

  selectTask(task: Task) {
    this._selectedTask.update(() => task);

  }

  clearSelectedTask() {
    this._selectedTask.set(null);
  }
}