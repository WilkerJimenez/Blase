import { Injectable } from '@angular/core';
import { RestApiCon } from '../../RESTservice'
import { regisModel, userModel } from '../../Modelos/models'

@Injectable({
  providedIn: 'root'
})
export class RegisServicesService {

  constructor() { }

  regisUser(endpoint: string, body: regisModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    con.requestMethod();
  }
}
