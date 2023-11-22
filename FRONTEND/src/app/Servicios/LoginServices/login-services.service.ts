import { Injectable } from '@angular/core';
import { RestApiCon } from '../../RESTservice'
import { userModel } from '../../Modelos/models'

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  constructor() {
  }

  logIn(endpoint: string, body: userModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return con.requestMethod();
  }
}
