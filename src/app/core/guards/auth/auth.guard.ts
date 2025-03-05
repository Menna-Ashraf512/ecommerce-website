import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router)
  const _pLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_pLATFORM_ID)) {
    const currentPath = state.url;

    if (localStorage.getItem('userToken') !== null) {
      return true; 
    } else {
      if (currentPath === '/home' || currentPath === '') {
        return true;
      } else {
        _router.navigate(['/login']);
        return false;
      }
    }
  } else {
    return true; 
  }
};