import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { machinesMock } from '../list-page/machinesMock';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrl: './edit-machine.component.scss',
})
export class EditMachineComponent implements OnInit {
  machineId!: number;
  machine: any;
  location: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el id de la máquina de la URL
    this.route.params.subscribe((params) => {
      this.machineId = +params['id']; // Obtiene el id como número
      this.loadMachineData();
    });
  }

  loadMachineData() {
    // Cargar la máquina desde el mock de datos usando el id
    this.machine = machinesMock.find((m) => m.id === this.machineId);
    // Si la máquina no se encuentra, puedes manejar el caso aquí, por ejemplo:
    if (!this.machine) {
      // Manejar el caso cuando no se encuentra la máquina
      console.error('Máquina no encontrada');
    }
  }
}
