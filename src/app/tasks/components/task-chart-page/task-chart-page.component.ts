import { Component, ElementRef, ViewChild, effect } from '@angular/core';
import { TasksStore } from '../../store/task.store';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-task-chart-page',
  standalone: true,
  templateUrl: './task-chart-page.component.html',
  styleUrls: ['./task-chart-page.component.scss']
})
export class TaskChartPageComponent {
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendCanvas') trendCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;
  trendChart: Chart | undefined;

  constructor(private store: TasksStore) {
    Chart.register(...registerables);

    effect(() => {
      const data = [
        this.store.inProgressCount(),
        this.store.doneCount(),
        this.store.toDoCount(),
      ];

      // If chart exists, update dataset directly
      if (this.chart) {
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      }
    });

    effect(() => {
    const trendData = this.store.tasksPerDay();

    if (this.trendChart) {
      this.trendChart.data.labels = trendData.map(([day]) => day);
      this.trendChart.data.datasets[0].data = trendData.map(([_, count]) => count);
      this.trendChart.update();
    }
  });
  }

  ngAfterViewInit(): void {

    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['In Progress', 'Done', 'To Do'],
        datasets: [
          {
            label: 'Status',
            data: [
              this.store.inProgressCount(),
              this.store.doneCount(),
              this.store.toDoCount(),
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const trendData = this.store.tasksPerDay();

    this.trendChart = new Chart(this.trendCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: trendData.map(([day]) => day),
        datasets: [
          {
            label: 'Tasks Created',
            data: trendData.map(([_, count]) => count),
            // fill: true,
            // tension: 0.3,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

