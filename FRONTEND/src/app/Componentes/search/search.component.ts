import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchServicesService } from '../../Servicios/SearchServices/search-services.service'
import { searchModel, addFriend } from 'src/app/Modelos/models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private endpointSearch = "api/search";
  private endpointAddFriend = "api/addFriend";
  body: searchModel = {
    query: ''
  }

  notFound = true;
  onError = false;
  users: any;
  constructor(private search: SearchServicesService, private toast: ToastrService) { }

  async onClickSearch() {
    if (this.body.query === '') return;
    let result = await this.search.searchRequest(this.endpointSearch, this.body);
    if (result?.status === 200) {
      this.users = result?.body;
      console.log(this.users)
      this.notFound = false;
    } else {
      this.notFound = true;
    }
  }

  async onClickAddFriend(friend: any) {
    const userId = JSON.parse(localStorage.getItem("usuario") || '{}');

    const friendReq: addFriend = {
      userId: userId?.uid,
      displayName: friend?.displayName,
      email: friend?.email,
      uid: friend?.uid,
      profilePic: friend?.profilePic
    }
    let result = await this.search.addFriendRequest(this.endpointAddFriend, friendReq);
    if (result?.status === 200) {
      this.toast.success("Se ha agregado a un amigo", "Blase", { timeOut: 2000 })
    } else {

    }
  }

}
