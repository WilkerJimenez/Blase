import { Injectable } from '@angular/core';
import { RestApiCon } from '../../RESTservice'
import { getFriend } from '../../Modelos/models'

@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {

  constructor() { }

  async getFriend(endpoint: string, body: getFriend) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let result: any = await con.requestMethod();

    localStorage.setItem("friends", JSON.stringify(result?.body));
    return result;
  }

}
