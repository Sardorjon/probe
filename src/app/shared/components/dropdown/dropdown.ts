import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DashboardService } from '@app/core';
import { Project } from '@app/shared';

@Component({
  selector: 'lib-dropdown',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  private readonly dashboardApi = inject(DashboardService);

  readonly label = input('Project');
  readonly initialProjectId = input<number | null>(null);

  readonly projectChange = output<Project>();

  readonly projects = signal<Project[]>([]);
  readonly selectedProjectId = signal<number | null>(null);

  readonly selectedProject = computed(() => {
    const selectedId = this.selectedProjectId();

    return this.projects().find((project) => project.id === selectedId) ?? null;
  });

  constructor() {
    this.dashboardApi.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);

        const initialProjectId = this.initialProjectId();
        const defaultProject = initialProjectId
          ? projects.find((project) => project.id === initialProjectId)
          : projects[0];

        if (defaultProject) {
          this.selectedProjectId.set(defaultProject.id);
          this.projectChange.emit(defaultProject);
        }
      },
      error: (error) => {
        console.error('Failed to load projects', error);
      },
    });

    effect(() => {
      const initialProjectId = this.initialProjectId();

      if (initialProjectId !== null) {
        this.selectedProjectId.set(initialProjectId);
      }
    });
  }

  onSelectionChange(event: MatSelectChange): void {
    this.selectedProjectId.set(event.value);

    const project = this.selectedProject();

    if (project) {
      this.projectChange.emit(project);
    }
  }
}
