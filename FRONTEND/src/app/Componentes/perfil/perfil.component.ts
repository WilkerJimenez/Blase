import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileServicesService } from 'src/app/Servicios/ProfileServices/profile-services.service';
import { getFriendModel, profileModel, updateFriend } from 'src/app/Modelos/models';
import { ToastrService } from 'ngx-toastr';
import { SocketServicesService } from 'src/app/Servicios/SocketServices/socket-services.service';
import { ImageCropperModule, ImageTransform } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCropperModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  @ViewChild('inputFile')
  myInputVariable!: ElementRef;
  @Input() friends: any;
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  userUid = this.userInfo?.uid;
  userImg = this.userInfo?.photoURL;
  userName = this.userInfo?.displayName;
  clickedImg = false;
  displayImg: any;
  newImg: any;
  storageRef: any;
  file: any;
  endpoint = "api/profileUpdate"
  transform: ImageTransform = {
    translateUnit: 'px'
  };

  body: profileModel = {
    id: this.userUid,
    displayName: this.userName,
    profilePic: this.userImg
  }

  constructor(private profile: ProfileServicesService, private toast: ToastrService, private socket: SocketServicesService,
    private storage: AngularFireStorage) {

    this.storageRef = this.storage.ref(`UserMedia/ProfilePics/${this.userUid}/`);
    if (this.userImg !== "https://empty.com" || this.userImg !== "") {
      if (this.userImg?.includes("https://lh3.googleusercontent.com")) {
        const biggerResolution = "s400-c";
        const original = "s96-c";
        this.displayImg = this.userImg?.replace(original, biggerResolution)
      } else {
        this.displayImg = this.userImg
      }
    }
  }
  ngOnInit() {
  }

  selectImg(event: any) {
    //var pathFile = event.target.files[0];
    if (!event || event === '' || !event.target.files[0]) return
    this.clickedImg = true;
    this.userImg = event
  }

  closeSelector() {
    this.myInputVariable.nativeElement.value = "";
    this.displayImg = this.userInfo?.photoURL;
    this.clickedImg = false;
  }

  crop(event: any) {
    this.file = event.blob;
    this.newImg = event;
  }

  updateImg() {
    this.displayImg = this.newImg?.objectUrl;
    this.clickedImg = false;
  }

  async onClickUpdate() {
    let validate: profileModel = {
      id: this.userUid,
      displayName: this.userName,
      profilePic: this.userImg
    }

    if (this.body.displayName === validate.displayName && this.body.profilePic === validate.profilePic) {
      return
    } else if (this.body.profilePic !== validate.profilePic) {
      this.storage.upload(`UserMedia/ProfilePics/${this.userUid}/${this.userUid}`, this.file).then(async image => {
        await image.ref.getDownloadURL().then(url => {
          this.body.profilePic = url;
        })
        const result = await this.profile.updateUser(this.endpoint, this.body)
        if (result?.status === 200) {
          this.userInfo.displayName = this.body.displayName;
          this.userInfo.photoURL = this.body.profilePic;
          localStorage.setItem('usuario', JSON.stringify(this.userInfo))
          this.userImg = this.userInfo?.photoURL;
          this.userName = this.userInfo?.displayName;

          for (let friend of this.friends) {
            const getFriend: updateFriend = {
              userIdF: friend.uid
            }
            await this.socket.updateFriend(getFriend).subscribe();
          }

          this.toast.success("Perfil actualizado", "Blase", { timeOut: 2000 })
        }
      });

    }
    else {
      const result = await this.profile.updateUser(this.endpoint, this.body)

      if (result?.status === 200) {
        this.userInfo.displayName = this.body.displayName;
        localStorage.setItem('usuario', JSON.stringify(this.userInfo))
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
