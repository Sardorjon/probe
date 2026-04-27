import { Metric } from '../models/metric';

export type MetricColumnKey = keyof Metric;

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMetricCell(row: Metric, column: MetricColumnKey): string | number {
  const value = row[column];

  if (typeof value !== 'number') {
    return value;
  }

  switch (column) {
    case 'revenue':
    case 'cost':
      return formatCurrency(value);

    case 'users':
      return formatNumber(value);

    case 'conversionRate':
      return formatPercent(value);

    default:
      return value;
  }
}
