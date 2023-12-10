import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchServicesService } from '../../Servicios/SearchServices/search-services.service'
import { searchModel, addFriendModel, getFriendModel } from 'src/app/Modelos/models';
import { ToastrService } from 'ngx-toastr';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';


@Component({
  selector: 'search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private endpointAddFriend = "api/addFriend";
  user = JSON.parse(localStorage.getItem("usuario") || '{}');
  @Input() friends: any;

  body: searchModel = {
    userId: this.user?.uid,
    friendName: '',
    friends: ''
  }

  getFriend: getFriendModel = {
    userId: this.user?.uid,
  }

  notFound = true;
  users: any;
  constructor(private search: SearchServicesService, private toast: ToastrService, private socket: SocketServicesService) {

  }
  ngOnInit(): void {
    this.body.friends = this.friends;
  }

  async Search() {
    if (this.body.friendName === '') {
      this.users = "";
      this.notFound = true;
    } else {
      this.socket.searchFriends(this.body).subscribe((change: any) => {
        if (Object.keys(change).length > 0) {
          this.users = change;
          this.notFound = false;
        } else {
          this.notFound = true;
        }
      });
    }
  }

  async getFriends() {
    this.socket.getNavBar(this.getFriend).subscribe((change) => {
      this.friends = change
    })
  }

  async onClickAddFriend(friend: any) {

    const friendReq: addFriendModel = {
      userId: this.user?.uid,
      displayName: this.user?.displayName,
      email: this.user?.email,
      profilePic: this.user?.photoURL,
      displayNameF: friend?.displayName,
      emailF: friend?.email,
      userIdF: friend?.uid,
      profilePicF: friend?.profilePic,
    }

    let result = await this.search.addFriendRequest(this.endpointAddFriend, friendReq);
    if (result?.status === 200) {
      this.getFriends();
      this.Search();
      this.toast.success("Se ha agregado a un amigo", "Blase", { timeOut: 2000 })
    } else {

    }
  }

}
