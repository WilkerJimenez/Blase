import { CanActivateFn } from '@angular/router';
import { LoginServicesService } from '../Servicios/LoginServices/login-services.service';
import { Router } from '@angular/router';

export const homeAuthGuardGuard: CanActivateFn = async (route, state) => {
  const router = new Router;
  const log = new LoginServicesService();
  const endpoint = "api/verifyId"
  if (!localStorage.getItem("usuario")) {
    router.navigate(['/auth']);
    return false;
  } else{
   // await log.verifySession("api/verifyId", localStorage.getItem("usuario").)
    return true;
  }
};


