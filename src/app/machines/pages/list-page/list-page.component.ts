import { Component } from '@angular/core';
import { machinesMock } from './machinesMock';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  machinesMock = machinesMock;
}
