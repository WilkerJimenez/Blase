import { Component } from '@angular/core';
import { LoginServicesService } from '../../Servicios/LoginServices/login-services.service'
import { userModel } from 'src/app/Modelos/models';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  endpoint = "api/login"
  log = new LoginServicesService()
  body:userModel = {
    email: '',
    password: ''
  };

  onSubmitLog() {
    console.log(this.body)
    this.log.logIn(this.endpoint, this.body);
  }

}
