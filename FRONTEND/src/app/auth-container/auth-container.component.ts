import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'auth-container',
    standalone: true,
    templateUrl: './auth-container.component.html',
    styleUrl: './auth-container.component.css',
    imports: [CommonModule, LoginComponent]
})
export class AuthContainerComponent {

}
