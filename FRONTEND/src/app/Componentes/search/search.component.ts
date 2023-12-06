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
  userId = JSON.parse(localStorage.getItem("usuario") || '{}');
  friends = JSON.parse(localStorage.getItem("friends") || '{}');

  body: searchModel = {
    userId: this.userId?.uid,
    friendName: ''
  }

  notFound = true;
  users: any;
  constructor(private search: SearchServicesService, private toast: ToastrService) { }

  async onClickSearch() {
    if (this.body.friendName === '') return;
    let result = await this.search.searchRequest(this.endpointSearch, this.body);
    if (result?.status === 200) {

      if (this.friends.length > 0) {
        let friendsIds: any = [];
        this.friends.forEach((element: { uid: any; }) => {
          friendsIds.push(element.uid)
        });
        let filter = result?.body.filter((f: { uid: any; }) => !friendsIds.includes(f.uid))
        this.users = filter;
      } else {
        this.users = result?.body;
      }

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
      this.friends.push(friend)
      localStorage.setItem("friends", JSON.stringify(this.friends))
      this.toast.success("Se ha agregado a un amigo", "Blase", { timeOut: 2000 })
    } else {

    }
  }

}
