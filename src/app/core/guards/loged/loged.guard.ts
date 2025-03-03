import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const logedGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('userToken') !== null) {
      _router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    }
      return false;
};
