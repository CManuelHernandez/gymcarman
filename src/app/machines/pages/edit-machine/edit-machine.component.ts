import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { machinesMock } from '../list-page/machinesMock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAIN_WEIGHT_OPTIONS,
  MAIN_WEIGHT_WHITE_OPTIONS,
  EXTRA_WEIGHT_OPTIONS,
  REST_OPTIONS,
  FEEDBACK_OPTIONS,
  REPETITIONS_OPTIONS,
  SERIES_OPTIONS,
} from './machine-options.constants';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrl: './edit-machine.component.scss',
})
export class EditMachineComponent implements OnInit {
  machineId!: number;
  machine: any;
  machineForm!: FormGroup;

  mainWeightOptions = MAIN_WEIGHT_OPTIONS;
  mainWeightWitheOptions = MAIN_WEIGHT_WHITE_OPTIONS;
  extraWeightOptions = EXTRA_WEIGHT_OPTIONS;
  restOptions = REST_OPTIONS;
  feedbackOptions = FEEDBACK_OPTIONS;
  seriesOptions = SERIES_OPTIONS;
  repetitionOptions = REPETITIONS_OPTIONS;

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
