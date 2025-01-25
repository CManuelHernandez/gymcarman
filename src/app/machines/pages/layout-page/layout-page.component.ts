import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent implements OnInit {
  isListPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isListPage = this.router.url.includes('list');
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
