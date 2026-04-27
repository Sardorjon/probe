import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatCurrency, formatNumber, formatPercent, Metric } from '@app/shared';

@Component({
  selector: 'lib-stats',
  standalone: true,
  templateUrl: './stats.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  readonly data = input<Metric[]>([]);

  readonly totalRevenue = computed(() =>
    this.data().reduce((total, metric) => total + metric.revenue, 0),
  );

  readonly totalCost = computed(() =>
    this.data().reduce((total, metric) => total + metric.cost, 0),
  );

  readonly totalUsers = computed(() =>
    this.data().reduce((total, metric) => total + metric.users, 0),
  );

  readonly averageConversionRate = computed(() => {
    const metrics = this.data();

    if (metrics.length === 0) {
      return 0;
    }

    return metrics.reduce((total, metric) => total + metric.conversionRate, 0) / metrics.length;
  });

  readonly formattedTotalRevenue = computed(() => formatCurrency(this.totalRevenue()));

  readonly formattedTotalCost = computed(() => formatCurrency(this.totalCost()));

  readonly formattedTotalUsers = computed(() => formatNumber(this.totalUsers()));

  readonly formattedAverageConversionRate = computed(() =>
    formatPercent(this.averageConversionRate()),
  );
}
