import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from '../registrar/registrar.component';

@Component({
    selector: 'auth-container',
    standalone: true,
    templateUrl: './auth-container.component.html',
    styleUrl: './auth-container.component.css',
    imports: [CommonModule, LoginComponent, RegistrarComponent]
})
export class AuthContainerComponent {
    loginShow: boolean = true;
    hide($event: boolean) {
        this.loginShow = $event;
    }
}
