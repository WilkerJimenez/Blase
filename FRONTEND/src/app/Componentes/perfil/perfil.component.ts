import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileServicesService } from 'src/app/Servicios/ProfileServices/profile-services.service';
import { getFriendModel, profileModel } from 'src/app/Modelos/models';
import { ToastrService } from 'ngx-toastr';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  @Input() friends: any;
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  userUid = this.userInfo?.uid;
  userImg = this.userInfo?.photoURL;
  userImgB = '';
  userName = this.userInfo?.displayName;
  endpoint = "api/profileUpdate"

  body: profileModel = {
    id: this.userUid,
    displayName: this.userName,
    profilePic: this.userImg
  }

  constructor(private profile: ProfileServicesService, private toast: ToastrService, private socket: SocketServicesService) {
    if (this.userImg !== "empty" || this.userImg !== "") {
      if (this.userImg?.includes("https://lh3.googleusercontent.com")) {
        const biggerResolution = "s400-c";
        const original = "s96-c";
        this.userImgB = this.userImg?.replace(original, biggerResolution)
      } else {

      }
    }
  }
  ngOnInit() {
  }

  async onClickUpdate() {
    let validate: profileModel = {
      id: this.userUid,
      displayName: this.userName,
      profilePic: this.userImg
    }

    if (this.body.displayName === '' || this.body.profilePic === '') {
      this.body.displayName = this.userName
      this.body.profilePic = this.userImg
    }

    if (this.body.displayName === validate.displayName && this.body.profilePic === validate.profilePic) {
      return
    } else {
      const result = await this.profile.updateUser(this.endpoint, this.body)
      if (result?.status === 200) {
        this.userInfo.displayName = this.body.displayName;
        this.userInfo.photoURL = this.body.profilePic;
        localStorage.setItem('usuario', JSON.stringify(this.userInfo))
        this.userImg = this.userInfo?.photoURL;
        this.userName = this.userInfo?.displayName;

        for (let friend of this.friends) {
          const getFriend: getFriendModel = {
            userId: friend.uid,
            userIdF: ''
          }
          await this.socket.getNavBar(getFriend).subscribe((change: any) => {
            if (change.length > 0) {
            }
          });
        }
        this.toast.success("Perfil actualizado", "Blase", { timeOut: 2000 })
      }

    }
  }
}
