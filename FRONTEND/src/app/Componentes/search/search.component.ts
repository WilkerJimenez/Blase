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
  responsive = true;
  users: any;

  srch: searchModel = {
    userId: this.user?.uid,
    friendName: '',
    friends: []
  }

  getR: getRequestsModel = {
    userId: this.user?.uid
  }

  constructor(private search: SearchServicesService, private toast: ToastrService, private socket: SocketServicesService) {
    this.getRequests(this.getR);
  }
  ngOnInit() {
    this.srch.friends = this.friends;
  }

  async Search() {
    this.srch.friends = this.friends;
    if (this.srch.friendName === '') {
      this.users = "";
      this.notFound = true;
    } else {
      setTimeout(() => {
        this.socket.searchFriends(this.srch).subscribe((change: any) => {
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

    this.socket.getRequests(uid).subscribe((change: any) => {
      if (change.length > 0) {
        change.map((e: any) => {
          if (e.uid !== this.user?.uid) {
            this.requests = change
          }
        })
      } else {
        this.requests = change
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
        this.srch.friends = change
      }
    })
  }

  async onClickSendRequest(req: any) {
    const friend: sendRequestsModel = {
      requestTo: req.uid,
      requestFrom: this.user?.uid
    }

    let result = await this.search.sendFriendRequest(this.endpointSendRequest, friend);
    if (result?.status === 200) {
      const friendReq: getRequestsModel = {
        userId: friend.requestTo
      }
      this.getRequests(friendReq);
      this.toast.success("Se ha enviado una solicitud de amistad", "Blase", { timeOut: 2000 })
    }

  }

  async onClickAddFriend(friend: any) {

    const friendReq: addFriendModel = {
      userId: this.user?.uid,
      userIdF: friend?.uid,
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


  responsiveMenu() {
    let body = document.getElementById('body');
    let navegation = document.getElementById('solicitudes');
    let btn = document.getElementById('menuBtn');
    if (this.responsive === true) {
      body?.classList.add("fixed")
      navegation?.classList.remove("animate-rightSlideOut")
      btn?.classList.remove("-rotate-0")
      navegation?.classList.remove("hidden")
      btn?.classList.add("-rotate-90")
      navegation?.classList.add("animate-rightSlide")
      this.responsive = false;
      console.log("si")
    } else {
      navegation?.classList.add("animate-rightSlideOut")
      setTimeout(() => {
        navegation?.classList.add("hidden")
        body?.classList.remove("fixed")
      }, 100);
      btn?.classList.remove("-rotate-90")
      btn?.classList.add("-rotate-0")
      this.responsive = true;
      console.log("no")
    }
    
    navegation?.classList.add("md:hidden")
  }

}
