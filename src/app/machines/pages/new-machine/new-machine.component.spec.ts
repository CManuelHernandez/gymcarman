import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMachineComponent } from './new-machine.component';

describe('NewMachineComponent', () => {
  let component: NewMachineComponent;
  let fixture: ComponentFixture<NewMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMachineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
