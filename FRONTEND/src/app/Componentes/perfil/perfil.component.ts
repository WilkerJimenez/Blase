import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileServicesService } from 'src/app/Servicios/ProfileServices/profile-services.service';

@Component({
  selector: 'perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userInfo = JSON.parse(localStorage.getItem("usuario") || '{}');
  userUid = this.userInfo?.uid;
  userImg = this.userInfo?.photoURL;
  userName = this.userInfo?.displayName;

  body = {
    displayName: ''
  }

  constructor(private profile: ProfileServicesService) {
    if (this.userImg !== "empty" || this.userImg !== "") {
      if (this.userImg.includes("https://lh3.googleusercontent.com")) {
        const biggerResolution = "s400-c";
        const original = "s96-c";
        this.userImg = this.userImg.replace(original, biggerResolution)
      } else {

      }
    }
  }
}
