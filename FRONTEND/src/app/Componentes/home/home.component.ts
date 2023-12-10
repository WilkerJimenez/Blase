import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { HomeServicesService } from 'src/app/Servicios/HomeServices/home-services.service';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';
import { getFriendModel } from '../../Modelos/models'

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  endpointFriends = "api/getFriend"
  navigationVar = "";
  userId = JSON.parse(localStorage.getItem("usuario") || '{}');
  body: getFriendModel = {
    userId: this.userId?.uid,
  };

  @Input() friends: any;

  constructor(private home: HomeServicesService, private socket: SocketServicesService) {
    this.getFriends();
  }

  async getFriends() {
    this.socket.getNavBar(this.body).subscribe((change) => {
      this.friends = change
    })
  }
  ngOnInit() {
  }

  onMenuClickSearch(item: string) {
    this.navigationVar = item;
  }

}
