import { Component, Input } from '@angular/core';
import { MachineFilterService } from '../../services/machinesFilter.service';
import { Subscription } from 'rxjs';
import { SidebarStateService } from '../../services/sidebarState.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  hasActiveFilters: boolean = false;
  private filterSubscription!: Subscription;

  filters: any = {};

  everDoneOptions = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];

  lastSeasonOptions = [
    { label: 'Más reciente primero', value: 'desc' },
    { label: 'Más antigua primero', value: 'asc' },
  ];

  weightOptions = [
    { label: 'Mayor a menor', value: 'desc' },
    { label: 'Menor a mayor', value: 'asc' },
  ];

  feedbackOptions = [
    { label: 'Mantener peso', value: 'Mantener peso' },
    { label: 'Subir peso', value: 'Subir peso' },
    { label: 'Bajar peso', value: 'Bajar peso' },
  ];

  machineTypeOptions = [
    { label: 'Negro', value: 'black' },
    { label: 'Blanco', value: 'white' },
  ];

  muscularGroupsOptions = [
    { label: 'Pecho', value: 'chest' },
    { label: 'Espalda', value: 'back' },
    { label: 'Bíceps', value: 'biceps' },
    { label: 'Tríceps', value: 'triceps' },
    { label: 'Abdominales', value: 'abs' },
    { label: 'Hombros', value: 'shoulders' },
    { label: 'Glúteos', value: 'glutes' },
    { label: 'Piernas', value: 'legs' },
  ];

  constructor(
    private filterService: MachineFilterService,
    private sidebarStateService: SidebarStateService
  ) {}

  @Input()
  set sidebarVisible(value: boolean) {
    this._sidebarVisible = value;
    this.sidebarStateService.setSidebarVisibility(value);
  }
  get sidebarVisible(): boolean {
    return this._sidebarVisible;
  }
  private _sidebarVisible = false;

  ngOnInit() {
    this.filterSubscription = this.filterService.filters$.subscribe(
      (filters) => {
        // Check if any filter is active
        this.hasActiveFilters = Object.values(filters).some(
          (value) => value !== undefined && value !== null
        );
      }
    );
  }

  applyFilters() {
    this.filterService.updateFilters(this.filters);
    this.sidebarVisible = false;
  }

  resetFilters() {
    this.filters = {};
    this.filterService.resetFilters();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }
}
