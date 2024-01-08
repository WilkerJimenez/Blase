import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { sendMessage } from 'src/app/Modelos/models';

@Component({
  selector: 'chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() friend: any;
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  myDate = new Date();
  body: sendMessage = {
    emisor: this.userInfo?.uid,
    fecha: '',
    mensaje: '',
    orden: 0,
    visto: false,
    mensajeResp: null,
    fileName: null,
    url: null
  }

  sendMessage(){
    
  }
}
