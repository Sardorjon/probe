import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { formatMetricCell, Metric, MetricColumnKey } from '@app/shared';

export type TableColumnKey = keyof Metric;

@Component({
  selector: 'lib-table',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly data = input<Metric[]>([]);
  readonly columns = input<TableColumnKey[]>([]);

  readonly columnLabels: Record<TableColumnKey, string> = {
    id: 'ID',
    projectId: 'Project ID',
    date: 'Date',
    revenue: 'Revenue',
    cost: 'Cost',
    users: 'Users',
    conversionRate: 'Conversion Rate',
  };

  cellValue(row: Metric, column: MetricColumnKey): string | number {
    return formatMetricCell(row, column);
  }
}
