import { Injectable, inject } from '@angular/core';
import { RestApiCon } from '../../RESTservice'
import { userModel, authModel } from '../../Modelos/models'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  private fireAuth;
  constructor() {
    this.fireAuth = inject(AngularFireAuth);
  }

  logIn(endpoint: string, body: userModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let result: any = con.requestMethod();

    return result;
  }

  logOut(endpoint: string) {
    let con = new RestApiCon(endpoint, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });

    let result: any = con.requestMethod();

    return result;
  }

  async logInG() {
    let response: { status: number, body: any } = {
      body: null,
      status: 0
    };
    await this.fireAuth.signInWithPopup(new GoogleAuthProvider)
      .then(data => {
        if (data.additionalUserInfo?.isNewUser) {
          response.status = 201
        } else {
          response.status = 200
        }
        response.body = data;
      }).catch(error => {
        response.status = 502
        console.log(error);
      })
    return response;
  }

  verifySession(endpoint: string, body: authModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result = con.requestMethod();
    return result;
  }
}
