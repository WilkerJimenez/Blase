import { Injectable } from '@angular/core';
import { RestApiCon } from '../../RESTservice'
import { searchModel, addFriend } from '../../Modelos/models'

@Injectable({
  providedIn: 'root'
})
export class SearchServicesService {

  constructor() { }

  searchRequest(endpoint: string, body: searchModel) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    let result: any = con.requestMethod();

    return result;
  }

  addFriendRequest(endpoint: string, body: addFriend) {
    let con = new RestApiCon(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    let result: any = con.requestMethod();

    return result;
  }
}
