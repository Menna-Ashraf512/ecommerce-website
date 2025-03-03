import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastrService = inject(ToastrService);
  const _router = inject(Router); 

  return next(req).pipe(
    catchError((err) => {
      if (_router.url !== '/login') {
        _toastrService.error(err.error.message, 'MegaCart');
      }

      return throwError(() => err);
    })
  );
};
