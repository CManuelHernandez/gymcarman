import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private LOGIN_STORAGE_KEY = environments.LOGIN_STORAGE_KEY;

  constructor(private router: Router) {}

  login() {
    sessionStorage.setItem(this.LOGIN_STORAGE_KEY, 'true');
    this.router.navigate(['/machines']);
  }
}
