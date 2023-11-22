import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from "./Componentes/inicio/inicio.component";
import { LoginComponent } from "./Componentes/login/login.component";
import { RegistrarComponent } from "./Componentes/registrar/registrar.component";
import { AuthContainerComponent } from "./Componentes/auth-container/auth-container.component";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        InicioComponent,
        RegistrarComponent,
        AuthContainerComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
    ]
})
export class AppModule { }
