import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '@app/core';
import { Metric, Project } from '@app/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = API_BASE_URL;
  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${this.apiUrl}/metrics`);
  }

  getMetricsByProjectId(projectId: number): Observable<Metric[]> {
    const params = new HttpParams().set('projectId', projectId);

    return this.http.get<Metric[]>(`${this.apiUrl}/metrics`, { params });
  }

  getMetricsByProjectIdAndDateRange(
    projectId: number,
    startDate: string,
    endDate: string,
  ): Observable<Metric[]> {
    const params = new HttpParams()
      .set('projectId', projectId)
      .set('date_gte', startDate)
      .set('date_lte', endDate);

    return this.http.get<Metric[]>(`${this.apiUrl}/metrics`, { params });
  }
}
