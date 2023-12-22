import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { HomeServicesService } from 'src/app/Servicios/HomeServices/home-services.service';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';
import { getFriendModel } from '../../Modelos/models'
import { PerfilComponent } from "../perfil/perfil.component";
import { LoginServicesService } from 'src/app/Servicios/LoginServices/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, SearchComponent, PerfilComponent]
})

export class HomeComponent implements OnInit {
  private router: Router = new Router;
  endpointFriends = "api/getFriend"
  endpointLog = "api/logout"
  navigationVar = "";
  isShown: boolean = false;
  userId = JSON.parse(localStorage.getItem("usuario") || '{}');
  body: getFriendModel = {
    userId: this.userId?.uid,
    userIdF: '',
  };

  @Input() friends: any;

  constructor(private home: HomeServicesService, private socket: SocketServicesService, private log: LoginServicesService) {
  }

  async getFriends() {
    this.socket.getNavBar(this.body).subscribe((change) => {
      this.friends = change
    })
  }
  async ngOnInit() {
    await this.getFriends();
  }

  onMenuClickSearch(item: string) {
    this.navigationVar = item;
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
