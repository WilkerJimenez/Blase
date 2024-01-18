import { Injectable } from '@angular/core';
import { sendMessage } from 'src/app/Modelos/models';
import { RestApiCon } from 'src/app/RESTservice';

@Injectable({
  providedIn: 'root'
})
export class ChatServicesService {

  constructor() { }

  enviarMensaje(endpoint: string, body: sendMessage) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let result: any = con.requestMethod();

    return result;
  }
}
