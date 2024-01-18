import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { getMessages, sendMessage } from 'src/app/Modelos/models';
import { ChatServicesService } from 'src/app/Servicios/ChatServices/chat-services.service';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  endpointSendMsg = 'api/enviarMsg'

  constructor(private chat: ChatServicesService, private datePipe: DatePipe, private socket: SocketServicesService) {
  }

  @Input() friend: any;
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  chatId = '';
  showReplay = false;
  slideDown = false;
  message: any;
  newMessage: sendMessage = {
    chatId: '',
    emisor: this.userInfo?.uid,
    fecha: '',
    mensaje: '',
    orden: 0,
    visto: false,
    mensajeResp: null,
    fileName: null,
    url: null
  }

  getMessage: getMessages = {
    chatId: ''
  }

  ngOnInit(): void {
    const result1 = this.userInfo?.uid + this.friend?.uid;
    const result2 = this.friend?.uid + this.userInfo?.uid;

    this.chatId = [result1, result2].sort().join('');
    this.newMessage.chatId = this.chatId;
    this.getMessage.chatId = this.chatId;
    this.getMessages();
  }

  async sendMessage() {
    if (this.newMessage.mensaje == "") return;
    const myDate = this.datePipe.transform(Date.now(), 'MMM d, y, h:mm a');
    this.newMessage.orden = new Date().getTime();
    this.newMessage.fecha = myDate;

    let result = await this.chat.enviarMensaje(this.endpointSendMsg, this.newMessage);
    if (result.status === 200) {
      this.newMessage.mensaje = ""
      this.getMessages();
    }
  }

  replayMsg(msg: string) {
    this.newMessage.mensajeResp = msg;
    this.showReplay = true;
  }

  cancelReplay() {
    this.slideDown = true;
    setTimeout(() => {
      this.slideDown = false;
      this.newMessage.mensajeResp = '';
      this.showReplay = false;
    }, 50);
  }

  getMessages() {
    this.socket.getMessages(this.getMessage).subscribe(change => {
      this.message = change;
    })
  }
}
