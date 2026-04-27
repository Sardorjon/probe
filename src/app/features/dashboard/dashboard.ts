import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DashboardService } from '@app/core';
import { DropdownComponent, Metric, Project, TableColumnKey, TableComponent } from '@app/shared';
import { RevenueChartComponent } from '@app/shared/components/revenue-chart/revenue-chart';
import { StatsComponent } from '@app/shared/components/stats/stats';

@Component({
  selector: 'app-dashboard',
  imports: [
    DropdownComponent,
    MatTableModule,
    TableComponent,
    StatsComponent,
    RevenueChartComponent,
  ],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  protected readonly dropdownLabel = signal<string>('Select project');
  protected readonly metrics = signal<Metric[]>([]);
  protected readonly columns = signal<TableColumnKey[]>([
    'projectId',
    'date',
    'revenue',
    'cost',
    'users',
    'conversionRate',
  ]);

  protected onProjectChange(project: Project): void {
    this.dashboardService.getMetricsByProjectId(project.id).subscribe({
      next: (metrics) => {
        this.metrics.set(metrics);
      },
      error: (error) => {
        console.error('Failed to load metrics', error);
      },
    });
  }
}
