import { Injectable } from '@angular/core';
import { profileModel } from 'src/app/Modelos/models';
import { RestApiCon } from 'src/app/RESTservice';

@Injectable({
  providedIn: 'root'
})
export class ProfileServicesService {

  constructor() { }

  updateUser(endpoint: string, body: profileModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    let result: any = con.requestMethod();

    return result;
  }
}
