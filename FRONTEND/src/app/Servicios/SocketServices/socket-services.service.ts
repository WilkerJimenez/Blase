import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { getFriendModel, getMessages, getRequestsModel, searchModel, updateFriend } from '../../Modelos/models'

@Injectable({
  providedIn: 'root'
})
export class SocketServicesService {
  private socket: socketIo.Socket
  constructor() {
    this.socket = socketIo.connect("http://localhost:8080");
  }

  getNavBar(body: getFriendModel) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('getFriends', body)
      this.socket.on(`getFriends${body.userId}`, data => {
        subscribe.next(data);
      })
    })
  }

  updateFriend(body: updateFriend) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('updateFriends', body)
    })
  }

  getRequests(body: getRequestsModel) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('getRequests', body)
      this.socket.on(`getRequests${body.userId}`, data => {
        subscribe.next(data);
      })
    })
  }

  searchFriends(body: searchModel) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('searchFriends', body)
      this.socket.on('searchFriends', data => {
        subscribe.next(data);
      })
    })
  }


  getMessages(body: getMessages) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('getMsgs', body)
      this.socket.on(`getMsgs${body.chatId}`, data => {
        subscribe.next(data);
      })
    })
  }
}
