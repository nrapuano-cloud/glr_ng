import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const backboneInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const lang = localStorage.getItem('lang') || 'it';

  const cloned = req.clone({

    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': token ? `Bearer ${token}` : '',
      'username': username || '',
      'lang': lang
    }

  });

  return next(cloned);

};
