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

  seasonOptions = ['2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01'];
  mainWeightOptions = [
    5, 12.5, 20.0, 27.5, 35.0, 42.5, 50.0, 57.5, 65.0, 72.5, 80.0, 87.5, 95.0,
    102.5, 110.0, 117.5, 125.0, 132.5, 140.0, 147.5, 155.0, 162.5, 170.0, 177.5,
    185.0, 192.5,
  ];
  extraWeightOptions = [0, 2.5, 5.0];
  seriesOptions = [1, 2, 3, 4, 5];
  repetitionOptions = [5, 10, 15, 20, 25, 30];
  restOptions = [30, 60, 90, 120];
  feedbackOptions = ['bien', 'mal', 'regular', 'excelente'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
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
      this.createForm();
    } else {
      console.error('Máquina no encontrada');
    }
  }

  createForm() {
    this.machineForm = this.fb.group({
      lastSeason: [
        this.machine.machineRutineData.lastSeason,
        Validators.required,
      ],
      weight: this.fb.group({
        mainWeight: [
          this.machine.machineRutineData.weight.mainWeight,
          Validators.required,
        ],
        extraWeight: [
          this.machine.machineRutineData.weight.extraWeight,
          Validators.required,
        ],
      }),
      series: [this.machine.machineRutineData.series, Validators.required],
      repetitions: [
        this.machine.machineRutineData.repetitions,
        Validators.required,
      ],
      restTime: [this.machine.machineRutineData.restTime, Validators.required],
      feedback: [this.machine.machineRutineData.feedback, Validators.required],
      image: [{ value: this.machine.image, disabled: true }],
    });
  }

  onSubmit() {
    if (this.machineForm.valid) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-ES');

      const updatedMachine = {
        ...this.machine,
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

      // Redirige a la lista de máquinas
      this.router.navigate(['/machines/list']);
    }
  }
}
