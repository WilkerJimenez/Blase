import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchServicesService } from '../../Servicios/SearchServices/search-services.service'
import { searchModel, addFriendModel, getFriendModel, getRequestsModel, sendRequestsModel } from 'src/app/Modelos/models';
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
  private endpointSendRequest = "api/sendRequest";

  user = JSON.parse(localStorage.getItem("usuario") || '{}');
  @Input() friends: any;
  requests: any[] = [];
  notFound = true;
  users: any;

  body: searchModel = {
    userId: this.user?.uid,
    friendName: '',
    friends: []
  }

  getR: getRequestsModel = {
    userId: this.user?.uid,
  }

  constructor(private search: SearchServicesService, private toast: ToastrService, private socket: SocketServicesService) {
    this.getRequests(this.getR);
  }
  ngOnInit() {
    this.body.friends = this.friends;
  }

  async Search() {
    if (this.body.friendName === '') {
      this.users = "";
      this.notFound = true;
    } else {
      setTimeout(() => {
        this.socket.searchFriends(this.body).subscribe((change: any) => {
          if (Object.keys(change).length > 0) {
            this.users = change;
            this.notFound = false;
          } else {
            this.notFound = true;
          }
        });
      }, 500);
    }
  }

  async getRequests(uid: getRequestsModel) {
    const getRequests: getRequestsModel = {
      userId: uid.userId,
    }

    this.socket.getRequests(getRequests).subscribe((change: any) => {
      if (change.length > 0) {
        change.map((e: any) => {
          if (e.userId !== this.user?.uid) {
            this.requests?.push(e)
          }
        })
      }
    })
  }

  async getFriends(uid: getFriendModel) {
    const getFriend: getFriendModel = {
      userId: uid.userId,
      userIdF: uid.userIdF
    }
    this.socket.getNavBar(getFriend).subscribe((change: any) => {
      if (change.length > 0) {
        let filter = [] = this.body.friends?.filter((item: any) => !change?.includes(item.uid))
        this.body.friends.push(filter);
      }
    })
  }

  async onClickSendRequest(req: any) {
    const friend: sendRequestsModel = {
      userIdF: req.uid,
      userId: this.user?.uid,
      displayName: this.user?.displayName,
      email: this.user?.email,
      profilePic: this.user?.photoURL
    }

    if (this.user.photoURL) friend.profilePic = ''
    let result = await this.search.sendFriendRequest(this.endpointSendRequest, friend);
    if (result?.status === 200) {
      const friendReq: getRequestsModel = {
        userId: friend.userIdF
      }
      this.getRequests(friendReq);
      this.toast.success("Se ha enviado una solicitud de amistad", "Blase", { timeOut: 2000 })
    }

  }

  async onClickAddFriend(friend: any) {

    const friendReq: addFriendModel = {
      userId: this.user?.uid,
      displayName: this.user?.displayName,
      email: this.user?.email,
      profilePic: this.user?.photoURL,
      displayNameF: friend?.displayName,
      emailF: friend?.email,
      userIdF: friend?.userId,
      profilePicF: friend?.profilePic,
    }

    let result = await this.search.addFriendRequest(this.endpointAddFriend, friendReq);
    if (result?.status === 200) {
      const getFriend: getFriendModel = {
        userId: friendReq.userId,
        userIdF: friendReq.userIdF
      }
      await this.getFriends(getFriend);
      this.getRequests(this.getR);
      this.toast.success("Se ha aceptado la solicitud", "Blase", { timeOut: 2000 })
    }
  }

}
