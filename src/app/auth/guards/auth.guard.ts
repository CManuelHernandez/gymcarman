import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('gymAppUser')) {
    return true;
  } else {
    router.navigate(['auth/login']);
    return false;
  }
};
