import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeAuthGuardGuard } from './Guard/home-auth-guard.guard';
import { loggedInGuardGuard } from './Guard/logged-in-guard.guard';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { AuthContainerComponent } from './Componentes/auth-container/auth-container.component';
import { HomeComponent } from './Componentes/home/home.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'auth', component: AuthContainerComponent, /*canActivate: [loggedInGuardGuard]*/ },
  { path: 'home', component: HomeComponent, /*canActivate: [homeAuthGuardGuard]*/ },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
