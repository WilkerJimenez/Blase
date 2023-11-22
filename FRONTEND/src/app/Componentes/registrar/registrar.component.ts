import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RegisServicesService } from "../../Servicios/RegisServices/regis-services.service"
import { regisModel } from 'src/app/Modelos/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  reg = new RegisServicesService()
  errorMsg = "";
  body: regisModel = {
    userName: '',
    email: '',
    password: ''
  }
  endpoint = "api/registrar"
  passConfirm = '';

  @Output() emitterReg = new EventEmitter<boolean>();

  hideRegis() {
    this.emitterReg.emit(true);
  }

  onSubmitRegis() {
    if (this.body.userName == '' || this.body.email == '' || this.body.password == '' || this.passConfirm == '') {
      this.errorMsg = "Rellene los campos faltantes."
      return;
    }

    if (this.passConfirm !== this.body.password) {
      this.errorMsg = "Las contraseñas son diferentes."
      return;
    }

    this.reg.regisUser(this.endpoint, this.body);
  }
}
