import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { HomeServicesService } from 'src/app/Servicios/HomeServices/home-services.service';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';
import { getFriendModel } from '../../Modelos/models'
import { PerfilComponent } from "../perfil/perfil.component";
import { LoginServicesService } from 'src/app/Servicios/LoginServices/login-services.service';
import { Router } from '@angular/router';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, SearchComponent, PerfilComponent, ChatComponent]
})

export class HomeComponent implements OnInit {
  private router: Router = new Router;
  endpointFriends = "api/getFriend"
  endpointLog = "api/logout"
  navigationVar = "";
  isShown: boolean = false;
  chatReady: boolean = true;
  userId = JSON.parse(localStorage.getItem("usuario") || '{}');
  getFriend: getFriendModel = {
    userId: this.userId?.uid,
    userIdF: '',
  };

  @ViewChild(ChatComponent)
  chatRef: ChatComponent | undefined;
  @Input() friends: any;
  @Input() sendFriend: any;

  constructor(private home: HomeServicesService, private socket: SocketServicesService, private log: LoginServicesService) {
    this.getFriends();
  }

  getFriends() {
    this.socket.getNavBar(this.getFriend).subscribe((change) => {
      this.friends = change
    })
  }

  ngOnInit() {
  }

  onMenuClickSearch(item: string) {
    this.navigationVar = item;
  }

  async openChat(friend: any) {
    if (this.navigationVar === 'chat') {
      this.chatReady = false;
    }
    
    this.sendFriend = friend;
    this.navigationVar = 'chat'
    setTimeout(() => {
      this.chatReady = true;
    }, 50);
  }

  showMenu() {
    this.isShown = !this.isShown;
  }

  profile() {
    this.isShown = false;
    this.onMenuClickSearch('profile')
  }

  logout() {
    const result = this.log.logOut(this.endpointLog)
    localStorage.removeItem("usuario")
    this.router.navigate(['/auth']);
  }
}
