import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./Componentes/inicio/inicio.component";
import { LoginComponent } from "./Componentes/login/login.component";
import { RegistrarComponent } from "./Componentes/registrar/registrar.component";
import { AuthContainerComponent } from "./Componentes/auth-container/auth-container.component";
import { LoginServicesService } from './Servicios/LoginServices/login-services.service';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from './firebaseConfig';

@NgModule({
    declarations: [
        AppComponent,

    ],
    providers: [LoginServicesService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        LoginComponent,
        InicioComponent,
        RegistrarComponent,
        AuthContainerComponent,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
    ]
})
export class AppModule { }
