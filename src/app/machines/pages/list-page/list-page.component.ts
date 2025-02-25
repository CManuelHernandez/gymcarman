import { Component, OnInit, OnDestroy } from '@angular/core';
import { machinesMock } from './machinesMock';
import { MachineFilterService } from '../../services/machinesFilter.service';
import { Subscription } from 'rxjs';
import { SidebarStateService } from '../../services/sidebarState.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit, OnDestroy {
  machines: any[] = [];
  showScrollTop = true;
  private filterSubscription!: Subscription;
  private sidebarSubscription!: Subscription;

  constructor(
    private filterService: MachineFilterService,
    private sidebarStateService: SidebarStateService
  ) {}

  ngOnInit() {
    this.loadMachines();

    this.filterSubscription = this.filterService.filters$.subscribe(() => {
      this.applyFilters();
    });

    this.sidebarSubscription = this.sidebarStateService.isVisible$.subscribe(
      (isVisible) => {
        this.showScrollTop = !isVisible;
      }
    );
  }

  loadMachines() {
    const localMachines = JSON.parse(localStorage.getItem('machines') || '[]');
    const machines =
      localMachines.length > 0
        ? machinesMock.map((mockMachine) => {
            const localMachine = localMachines.find(
              (machine: any) => machine.id === mockMachine.id
            );
            return this.preprocessMachine(localMachine || mockMachine);
          })
        : machinesMock.map((machine) => this.preprocessMachine(machine));

    this.filterService.setOriginalMachines(machines);
    this.machines = machines;
  }

  preprocessMachine(machine: any) {
    return {
      ...machine,
      processedImages: [
        this.normalizeImageSrc(machine.image.primary),
        this.normalizeImageSrc(machine.image.secondary),
      ].map((src) => ({
        src: src,
        width: '100%',
        height: '25vh',
      })),
    };
  }

  normalizeImageSrc(src: string): string {
    return src;
  }

  applyFilters() {
    this.machines = this.filterService.applyFilters();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
  }
}
