import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { HomeServicesService } from 'src/app/Servicios/HomeServices/home-services.service';
import { getFriend } from '../../Modelos/models'

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
  body: getFriend = {
    userId: this.userId?.uid
  };

  friends: any;

  constructor(private home: HomeServicesService) {

  }

  async ngOnInit(): Promise<void> {
    let result = await this.home.getFriend(this.endpointFriends, this.body);
    this.friends = result?.body;
  }

  onMenuClickSearch(item: string) {
    this.navigationVar = item;
  }

}
