import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderService } from '../services/loader';

@Component({
  selector: 'lib-loader',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (loaderService.isLoading()) {
      <div class="loader-backdrop">
        <mat-spinner diameter="48"></mat-spinner>
      </div>
    }
  `,
  styles: [
    `
      .loader-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.55);
        backdrop-filter: blur(2px);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  readonly loaderService = inject(LoaderService);
}
