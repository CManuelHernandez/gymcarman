import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { machinesMock } from '../list-page/machinesMock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrl: './edit-machine.component.scss',
})
export class EditMachineComponent implements OnInit {
  machineId!: number;
  machine: any;
  machineForm!: FormGroup;

  mainWeightOptions = [
    5, 12.5, 20.0, 27.5, 35.0, 42.5, 50.0, 57.5, 65.0, 72.5, 80.0, 87.5, 95.0,
    102.5, 110.0, 117.5, 125.0, 132.5, 140.0, 147.5, 155.0, 162.5, 170.0, 177.5,
    185.0, 192.5,
  ];
  extraWeightOptions = [0, 2.5, 5.0];
  restOptions = [30, 60, 90, 120];
  feedbackOptions = ['Mantener peso', 'Subir peso', 'Bajar peso'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.machineForm = this.fb.group({});
    this.route.params.subscribe((params) => {
      this.machineId = +params['id'];
      this.loadMachineData();
    });
  }

  loadMachineData() {
    const localMachines = JSON.parse(localStorage.getItem('machines') || '[]');
    this.machine =
      localMachines.find((m: any) => m.id === this.machineId) ||
      machinesMock.find((m) => m.id === this.machineId);

    if (this.machine) {
      // Asegúraarse de que todos los datos existen antes de crear el formulario
      this.machine.machineRutineData = this.machine.machineRutineData || {};
      this.machine.machineRutineData.weight = this.machine.machineRutineData
        .weight || { mainWeight: 5, extraWeight: 0 };
      this.createForm();
    } else {
      console.error('Máquina no encontrada');
    }
  }

  createForm() {
    this.machineForm = this.fb.group({
      lastSeason: [
        this.machine.machineRutineData.lastSeason || 'Sin session',
        Validators.required,
      ],
      weight: this.fb.group({
        mainWeight: [
          this.machine.machineRutineData.weight.mainWeight || 5,
          Validators.required,
        ],
        extraWeight: [
          this.machine.machineRutineData.weight.extraWeight || 0,
          Validators.required,
        ],
      }),
      series: [
        this.machine.machineRutineData.series || 1,
        [Validators.required, Validators.min(0)],
      ],
      repetitions: [
        this.machine.machineRutineData.repetitions || 5,
        [Validators.required, Validators.min(0)],
      ],

      restTime: [
        this.machine.machineRutineData.restTime || 30,
        Validators.required,
      ],
      feedback: [
        this.machine.machineRutineData.feedback || 'mantener peso',
        Validators.required,
      ],
      image: [{ value: this.machine.image, disabled: true }],
    });
  }

  onSubmit() {
    if (this.machineForm.valid) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-ES');

      const updatedMachine = {
        ...this.machine,
        everDone: true,
        machineRutineData: {
          ...this.machine.machineRutineData,
          ...this.machineForm.value,
          lastSeason: formattedDate,
        },
      };

      const localMachines = JSON.parse(
        localStorage.getItem('machines') || '[]'
      );
      const updatedMachines = localMachines.filter(
        (m: any) => m.id !== this.machineId
      );
      updatedMachines.push(updatedMachine);

      localStorage.setItem('machines', JSON.stringify(updatedMachines));
      console.log(
        'Máquina actualizada y guardada en Local Storage:',
        updatedMachine
      );

      this.router.navigate(['/machines/list']);
    }
  }
}
