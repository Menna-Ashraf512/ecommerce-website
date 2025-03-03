import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const _ngxSpinnerService = inject(NgxSpinnerService);
  
    const url = req.url.toLowerCase();
  
    if (url.includes('cart') || url.includes('wishlist')) {
      return next(req);
    } else {
      _ngxSpinnerService.show();
    }
  
    return next(req).pipe(
      finalize(() => {
        setTimeout(() => {
          _ngxSpinnerService.hide();
        }, 3000);
      })
    );
  };
  