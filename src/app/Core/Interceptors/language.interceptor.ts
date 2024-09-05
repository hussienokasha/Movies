import { HttpInterceptorFn } from '@angular/common/http';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  let lang = localStorage.getItem('language')??'en-US'
  let cloned = req.clone({
    params: req.params.set('language', lang),
  });
  return next(cloned);
};
