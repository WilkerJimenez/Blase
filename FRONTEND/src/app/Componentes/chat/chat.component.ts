import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private chat: ChatServicesService, private datePipe: DatePipe, private socket: SocketServicesService,
    private storage: AngularFireStorage) {
  }

  @Input() friend: any;
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  chatId = '';
  showReplay = false;
  slideDown = false;
  selectedFile = false;
  message: any;
  fileDetails: { fileName: string, file: any } = {
    fileName: '',
    file: ''
  };

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

  selectImg(event: any) {
    if (!event || event === '' || !event.target.files[0]) {
      this.myInputVariable.nativeElement.value = "";
      this.fileDetails.file = ''
      this.fileDetails.fileName = ''
      this.selectedFile = false;
    } else {
      this.fileDetails.file = event.target.files[0];
      this.fileDetails.fileName = event.target.files[0].name;
      this.selectedFile = true;
    }
  }

  async sendFile() {
    await this.storage.upload(`UserMedia/Chats/${this.chatId}/${uuidv4()}`, this.fileDetails.file).then(async file => {
      await file.ref.getDownloadURL().then(url => {
        this.newMessage.url = url;
        this.newMessage.fileName = this.fileDetails.fileName;
      })
    });
  }

  async sendMessage() {
    if (this.newMessage.mensaje === "") {
      if (!this.fileDetails) {
        return
      }
    }

    if (this.fileDetails) {
      await this.sendFile();
    }

    const myDate = this.datePipe.transform(Date.now(), 'MMM d, y, h:mm a');
    this.newMessage.orden = new Date().getTime();
    this.newMessage.fecha = myDate;

    let result = await this.chat.enviarMensaje(this.endpointSendMsg, this.newMessage);
    if (result.status === 200) {
      this.newMessage.mensaje = ""
      this.getMessages();
    }
  }

  Redireccionar(url: string) {
    window.open(url, '_blank');
  }

  replayMsg(msg: any) {
    if (msg.mensaje || msg.mensaje !== "") {
      this.newMessage.mensajeResp = msg.mensaje;
      this.showReplay = true;
    } else if (msg.url) {
      this.newMessage.mensajeResp = "File";
      this.showReplay = true;
    }
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
