// src/app/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

    if (req.url.includes('/api/auth/')) {
    return next(req);
  }
  const token = localStorage.getItem('jwt_token'); // ou ton AuthService.getToken()
  if (token) {
    console.log('Token envoyé dans le header :', token); // AJOUTE ÇA POUR VOIR
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }else {
    console.log('AUCUN TOKEN trouvé dans localStorage');
  }
  return next(req);
};