import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RegisServicesService } from "../../Servicios/RegisServices/regis-services.service"
import { LoginServicesService } from "../../Servicios/LoginServices/login-services.service"
import { regisFModel, regisModel } from 'src/app/Modelos/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  constructor(private reg: RegisServicesService, private log: LoginServicesService) { }

  errorMsg = "";
  body: regisModel = {
    userName: '',
    email: '',
    password: '',
    profilePic: 'empty'
  }

  endpointR = "api/registrar"
  endpointL = "api/login"
  endpointF = "api/registrarToDb"

  passConfirm = '';
  private router: Router = new Router;

  @Output() emitterReg = new EventEmitter<boolean>();

  hideRegis() {
    this.emitterReg.emit(true);
  }

  async onSubmitRegis() {
    if (this.body.userName == '' || this.body.email == '' || this.body.password == '' || this.passConfirm == '') {
      this.errorMsg = "Rellene los campos faltantes."
      return;
    }

    if (this.passConfirm !== this.body.password) {
      this.errorMsg = "Las contraseñas son diferentes."
      return;
    }

    let result = await this.reg.regisUser(this.endpointR, this.body);
    if (result?.status === 200) {
      var userF: regisFModel = {
        userName: this.body.userName,
        email: this.body.email,
        uid: result.body.user.uid,
        profilePic: 'empty'
      }

      await this.reg.regisUserF(this.endpointF, userF)

      localStorage.setItem('usuario', JSON.stringify(result.body?.user));
      this.router.navigate(['/home']);
    } else if (result?.status === 409) {
      this.errorMsg = "El usuario ya existe";
    } else if (result?.status === 502) {
      this.errorMsg = "Error inesperado";
    }
  }
}
