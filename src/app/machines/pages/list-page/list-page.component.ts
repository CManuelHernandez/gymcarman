import { Component, OnInit } from '@angular/core';
import { machinesMock } from './machinesMock';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  machines: any[] = [];

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines() {
    const localMachines = JSON.parse(localStorage.getItem('machines') || '[]');
    if (localMachines.length > 0) {
      this.machines = machinesMock.map((mockMachine) => {
        const localMachine = localMachines.find(
          (machine: any) => machine.id === mockMachine.id
        );
        return localMachine || mockMachine;
      });
    } else {
      this.machines = machinesMock;
    }
  }

  test(machine: any) {
    console.log(machine);
  }
}
