import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environments } from '../../environments/environments';

export interface MachineFilter {
  exercise?: string;
  everDone?: boolean;
  muscularGroup?:
    | 'chest'
    | 'back'
    | 'biceps'
    | 'triceps'
    | 'abs'
    | 'shoulders'
    | 'glutes'
    | 'legs';
  machineType?: 'black' | 'white';
  lastSeasonSort?: 'asc' | 'desc';
  weightSort?: 'asc' | 'desc';
  feedback?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MachineFilterService {
  private _filters = new BehaviorSubject<MachineFilter>({});
  private _originalMachines: any[] = [];
  private FILTER_STORAGE_KEY = environments.FILTER_STORAGE_KEY;

  filters$ = this._filters.asObservable();

  constructor() {
    // Load filters from sessionStorage on service initialization
    const storedFilters = sessionStorage.getItem(this.FILTER_STORAGE_KEY);
    if (storedFilters) {
      this._filters.next(JSON.parse(storedFilters));
    }
  }

  setOriginalMachines(machines: any[]) {
    this._originalMachines = machines;
  }

  updateFilters(filters: MachineFilter) {
    this._filters.next(filters);
    sessionStorage.setItem(this.FILTER_STORAGE_KEY, JSON.stringify(filters));
  }

  applyFilters(): any[] {
    const currentFilters = this._filters.value;
    let filteredMachines = [...this._originalMachines];

    // Exercise text filter
    if (currentFilters.exercise) {
      filteredMachines = filteredMachines.filter((machine) =>
        machine.exercise
          .toLowerCase()
          .includes(currentFilters.exercise?.toLowerCase())
      );
    }

    // Machine Type filter
    if (currentFilters.machineType) {
      filteredMachines = filteredMachines.filter(
        (machine) => machine.machineType === currentFilters.machineType
      );
    }

    // Muscular Group filter
    if (currentFilters.muscularGroup) {
      filteredMachines = filteredMachines.filter(
        (machine) => machine.muscularGroup === currentFilters.muscularGroup
      );
    }

    // EverDone boolean filter
    if (currentFilters.everDone !== undefined) {
      filteredMachines = filteredMachines.filter(
        (machine) => machine.everDone === currentFilters.everDone
      );
    }

    // Feedback filter
    if (currentFilters.feedback) {
      filteredMachines = filteredMachines.filter(
        (machine) =>
          machine.machineRutineData.feedback === currentFilters.feedback
      );
    }

    // LastSeason sorting
    if (currentFilters.lastSeasonSort) {
      filteredMachines.sort((a, b) => {
        const dateA = new Date(a.machineRutineData.lastSeason);
        const dateB = new Date(b.machineRutineData.lastSeason);
        return currentFilters.lastSeasonSort === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    // Weight sorting
    if (currentFilters.weightSort) {
      filteredMachines.sort((a, b) => {
        const weightA =
          a.machineRutineData.weight.mainWeight +
          a.machineRutineData.weight.extraWeight;
        const weightB =
          b.machineRutineData.weight.mainWeight +
          b.machineRutineData.weight.extraWeight;
        return currentFilters.weightSort === 'asc'
          ? weightA - weightB
          : weightB - weightA;
      });
    }

    return filteredMachines;
  }

  resetFilters() {
    this._filters.next({});
    sessionStorage.removeItem(this.FILTER_STORAGE_KEY);
  }
}
