import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let cloned = req.clone({
    setHeaders: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDEwNzI4YzA4MTdjM2I1YjRkMDlhNjU0NTViMjBmYyIsIm5iZiI6MTcyMDY5ODE5NS4wMjEyOTMsInN1YiI6IjY1MjkwNGMxMWYzZTYwMDBjNTg4NjRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oVg6S1BLU-5BoVf8pWY5wGBgvs18Fw4Jbtm71VaivAA',
    },
  });
  return next(cloned);
};
