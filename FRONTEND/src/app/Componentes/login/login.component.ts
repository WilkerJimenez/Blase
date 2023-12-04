import { Component, EventEmitter, Output } from '@angular/core';
import { LoginServicesService } from '../../Servicios/LoginServices/login-services.service'
import { regisFModel, userModel } from 'src/app/Modelos/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisServicesService } from 'src/app/Servicios/RegisServices/regis-services.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() emitterLog = new EventEmitter<boolean>();
  private router: Router = new Router;
  errorMsg: string = "";
  private endpoint = "api/login"
  private endpointF = "api/registrarToDb"
  body: userModel = {
    email: '',
    password: ''
  };

  constructor(private log: LoginServicesService, private reg: RegisServicesService) { }

  async onSubmitLog() {
    if (this.body.email == '' || this.body.password == '') {
      this.errorMsg = "Rellene los campos faltantes.";
      return;
    }
    let result = await this.log.logIn(this.endpoint, this.body);
    if (result?.status === 200) {
      console.log(result.body?.user);
      localStorage.setItem("usuario", JSON.stringify(result.body?.user));
      this.router.navigate(['/home']);
    } else if (result?.status === 400) {
      this.errorMsg = "El usuario no existe."
    } else if (result?.status === 502) {
      this.errorMsg = "Ha ocurrido un error."
    }
  }

  async onSubmitG() {
    let result = await this.log.logInG();
    if (result?.status === 200) {
      console.log(result.body?.user);
      localStorage.setItem("usuario", JSON.stringify(result.body?.user))
      this.router.navigate(['/home']);
    } else if (result?.status === 201) {

      console.log(result.body?.user);
      var userF: regisFModel = {
        userName: result.body?.user.displayName,
        email: result.body?.user.email,
        uid: result.body.user.uid,
        profilePic: result.body.user.photoURL
      }
      await this.reg.regisUserF(this.endpointF, userF)
      localStorage.setItem("usuario", JSON.stringify(result.body?.user))
      this.router.navigate(['/home']);
    }
    else {

      this.errorMsg = "Ha ocurrido un error."
    }
  }

  hideLogin() {
    this.emitterLog.emit(false);
  }

}
