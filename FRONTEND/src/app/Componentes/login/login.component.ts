import { Component, EventEmitter, Output } from '@angular/core';
import { LoginServicesService } from '../../Servicios/LoginServices/login-services.service'
import { userModel } from 'src/app/Modelos/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() emitterLog = new EventEmitter<boolean>();
  errorMsg: string = "";
  endpoint = "api/login"
  log = new LoginServicesService()
  body: userModel = {
    email: '',
    password: ''
  };

  async onSubmitLog() {
    if (this.body.email == '' || this.body.password == '') {
      this.errorMsg = "Rellene los campos faltantes.";
      return;
    }
    let status = await this.log.logIn(this.endpoint, this.body);
    console.log(status)
  }

  hideLogin() {
    this.emitterLog.emit(false);
  }

}
