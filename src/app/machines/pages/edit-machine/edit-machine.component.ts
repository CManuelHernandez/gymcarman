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
    { label: '5 Kg', value: 5 },
    { label: '12.5 Kg', value: 12.5 },
    { label: '20.0 Kg', value: 20.0 },
    { label: '27.5 Kg', value: 27.5 },
    { label: '35.0 Kg', value: 35.0 },
    { label: '42.5 Kg', value: 42.5 },
    { label: '50.0 Kg', value: 50.0 },
    { label: '57.5 Kg', value: 57.5 },
    { label: '65.0 Kg', value: 65.0 },
    { label: '72.5 Kg', value: 72.5 },
    { label: '80.0 Kg', value: 80.0 },
    { label: '87.5 Kg', value: 87.5 },
    { label: '95.0 Kg', value: 95.0 },
    { label: '102.5 Kg', value: 102.5 },
    { label: '110.0 Kg', value: 110.0 },
    { label: '117.5 Kg', value: 117.5 },
    { label: '125.0 Kg', value: 125.0 },
    { label: '132.5 Kg', value: 132.5 },
    { label: '140.0 Kg', value: 140.0 },
    { label: '147.5 Kg', value: 147.5 },
    { label: '155.0 Kg', value: 155.0 },
    { label: '162.5 Kg', value: 162.5 },
    { label: '170.0 Kg', value: 170.0 },
    { label: '177.5 Kg', value: 177.5 },
    { label: '185.0 Kg', value: 185.0 },
    { label: '192.5 Kg', value: 192.5 },
  ];
  mainWeightWitheOptions = [
    { label: '0 (0 Kg)', value: 0 },
    { label: '1 (5 Kg)', value: 5 },
    { label: '2 (10 Kg)', value: 10 },
    { label: '3 (15 Kg)', value: 15 },
    { label: '4 (20 Kg)', value: 20 },
    { label: '5 (25 Kg)', value: 25 },
    { label: '6 (30 Kg)', value: 30 },
    { label: '7 (35 Kg)', value: 35 },
    { label: '8 (40 Kg)', value: 40 },
    { label: '9 (45 Kg)', value: 45 },
    { label: '10 (50 Kg)', value: 50 },
    { label: '11 (55 Kg)', value: 55 },
    { label: '12 (60 Kg)', value: 60 },
  ];
  extraWeightOptions = [
    { label: '0 Kg', value: 0 },
    { label: '2.5 Kg', value: 2.5 },
    { label: '5 Kg', value: 5.0 },
    0,
    2.5,
    5.0,
  ];
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
      this.machine.machineRutineData = this.machine.machineRutineData || {};
      this.machine.machineRutineData.weight = this.machine.machineRutineData
        .weight || { mainWeight: 5, extraWeight: 0 };

      /* if (this.machine.machineType === 'white') {
        this.machine.machineRutineData.weight.mainWeight = 0;
      } */

      this.createForm();
    } else {
      console.error('Máquina no encontrada');
    }
    console.log(this.machine);
  }

  createForm() {
    const isWhiteMachine = this.machine.machineType === 'white';

    this.machineForm = this.fb.group({
      lastSeason: [
        this.machine.machineRutineData.lastSeason || 'Sin session',
        Validators.required,
      ],
      weight: this.fb.group({
        mainWeight: [
          this.machine.machineRutineData.weight.mainWeight ||
            (!isWhiteMachine ? 5 : 0),
          Validators.required,
        ],
        extraWeight: [
          {
            value: isWhiteMachine
              ? 0
              : this.machine.machineRutineData.weight.extraWeight || 0,
            disabled: isWhiteMachine,
          },
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
          ...this.machineForm.getRawValue(),
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
