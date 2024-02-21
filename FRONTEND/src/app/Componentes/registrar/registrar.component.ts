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
  successMsg = "";
  regis: regisModel = {
    userName: '',
    email: '',
    password: '',
    profilePic: 'https://empty.com'
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
    if (this.regis.userName == '' || this.regis.email == '' || this.regis.password == '' || this.passConfirm == '') {
      this.errorMsg = "Rellene los campos faltantes."
      return;
    }

    if (this.passConfirm !== this.regis.password) {
      this.errorMsg = "Las contraseñas son diferentes."
      return;
    }

    let result = await this.reg.regisUser(this.endpointR, this.regis);
    console.log(result)
    if (result?.status === 200) {
      this.errorMsg = "";
      this.successMsg = "Verificacion de email enviada."

    } else if (result?.status === 409) {
      this.successMsg = ""
      this.errorMsg = "El usuario ya existe";
    } else if (result?.status === 422) {
      this.successMsg = ""
      this.errorMsg = "La contraseña debe tener almenos 6 caracteres";
    } else if (result?.status === 502) {
      this.successMsg = ""
      this.errorMsg = "Error inesperado";
    }
  }
}
