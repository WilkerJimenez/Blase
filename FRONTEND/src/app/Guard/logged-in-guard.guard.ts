import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loggedInGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router;
  if (localStorage.getItem("usuario")) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
