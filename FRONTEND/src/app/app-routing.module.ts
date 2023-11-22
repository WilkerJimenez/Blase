import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { AuthContainerComponent } from './Componentes/auth-container/auth-container.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'auth', component: AuthContainerComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
