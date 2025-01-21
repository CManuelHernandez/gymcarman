import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  login() {
    sessionStorage.setItem('gymAppUser', 'true');
    this.router.navigate(['/machines']);
  }
}
