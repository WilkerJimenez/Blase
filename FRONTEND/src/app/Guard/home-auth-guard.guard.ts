import { CanActivateFn } from '@angular/router';
import { LoginServicesService } from '../Servicios/LoginServices/login-services.service';
import { Router } from '@angular/router';
import { authModel } from '../Modelos/models';

export const homeAuthGuardGuard: CanActivateFn = async (route, state): Promise<boolean> => {
  const router = new Router;
  const log = new LoginServicesService();
  const endpoint = "api/verifyId"
  if (!localStorage.getItem("usuario")) {
    router.navigate(['/auth']);
    return false;
  } else {
    let userInfo = localStorage.getItem("usuario");
    let jsonParse: any = JSON.parse(userInfo || '{}');
    let body: authModel = {
      IdToken: jsonParse?.stsTokenManager.accessToken,
    };
    let status = await log.verifySession(endpoint, body);
    if (status?.status === 200) {
      router.navigate(['/home']);
      return true;
    } else {
      localStorage.removeItem("usuario")
      router.navigate(['/auth']);
      return false;
    }
  }
}


