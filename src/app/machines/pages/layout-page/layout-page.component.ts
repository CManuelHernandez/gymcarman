import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent {
  constructor(private router: Router) {}

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
