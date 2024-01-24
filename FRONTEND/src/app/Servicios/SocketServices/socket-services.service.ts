import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { connectChat, connectHome, getFriendModel, getMessages, getRequestsModel, searchModel, updateFriend } from '../../Modelos/models'

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

  connectHome(body: connectHome) {
    this.socket.on('connect', () => {
    })
    this.socket.emit('connectingHome', body);
  }

  connectChat(body: connectChat) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('connectingChat', body);
      this.socket.on(`seen${body.chatId}`, data => {
        subscribe.next(data);
      })
    })
  }

  /*
  disconnectChat(body: connectChat) {
    return new Observable(subscribe => {
      this.socket.on('connect', () => {
      })
      this.socket.emit('disconnectingChat', body);
    })
  }
  */

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
