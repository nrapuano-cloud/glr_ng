import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';

export const backboneInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const langService = inject(LanguageService);

  const token = auth.getToken();
  const username = auth.getUsername();
  const lang = langService.getLang();

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