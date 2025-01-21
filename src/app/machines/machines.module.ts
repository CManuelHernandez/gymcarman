import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewMachineComponent } from './pages/new-machine/new-machine.component';
import { PrimengModule } from '../primeng/primeng.module';
import { EditMachineComponent } from './pages/edit-machine/edit-machine.component';

@NgModule({
  declarations: [LayoutPageComponent, ListPageComponent, NewMachineComponent, EditMachineComponent],
  imports: [CommonModule, MachinesRoutingModule, PrimengModule],
})
export class MachinesModule {}
