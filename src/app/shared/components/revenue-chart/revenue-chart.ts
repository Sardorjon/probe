import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatCurrency, Metric } from '@app/shared';

type ChartPoint = {
  x: number;
  y: number;
  date: string;
  revenue: number;
};

@Component({
  selector: 'lib-revenue-chart',
  standalone: true,
  templateUrl: './revenue-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueChartComponent {
  readonly data = input<Metric[]>([]);

  readonly width = input(800);
  readonly height = input(260);

  private readonly padding = 32;

  readonly sortedData = computed(() =>
    [...this.data()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  );

  readonly maxRevenue = computed(() => {
    const revenues = this.sortedData().map((metric) => metric.revenue);
    return Math.max(...revenues, 0);
  });

  readonly minRevenue = computed(() => {
    const revenues = this.sortedData().map((metric) => metric.revenue);
    return Math.min(...revenues, 0);
  });

  readonly points = computed<ChartPoint[]>(() => {
    const metrics = this.sortedData();
    const width = this.width();
    const height = this.height();

    if (metrics.length === 0) {
      return [];
    }

    const chartWidth = width - this.padding * 2;
    const chartHeight = height - this.padding * 2;

    const min = this.minRevenue();
    const max = this.maxRevenue();
    const range = max - min || 1;

    return metrics.map((metric, index) => {
      const x = this.padding + (index / Math.max(metrics.length - 1, 1)) * chartWidth;

      const y = this.padding + chartHeight - ((metric.revenue - min) / range) * chartHeight;

      return {
        x,
        y,
        date: metric.date,
        revenue: metric.revenue,
      };
    });
  });

  readonly linePath = computed(() => {
    const points = this.points();

    if (points.length === 0) {
      return '';
    }

    return points
      .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
      .join(' ');
  });

  readonly areaPath = computed(() => {
    const points = this.points();

    if (points.length === 0) {
      return '';
    }

    const first = points[0];
    const last = points[points.length - 1];
    const bottomY = this.height() - this.padding;

    return `${this.linePath()} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  });

  readonly startLabel = computed(() => this.sortedData()[0]?.date ?? '');
  readonly endLabel = computed(() => this.sortedData().at(-1)?.date ?? '');

  readonly maxRevenueLabel = computed(() => formatCurrency(this.maxRevenue()));
  readonly minRevenueLabel = computed(() => formatCurrency(this.minRevenue()));
}
