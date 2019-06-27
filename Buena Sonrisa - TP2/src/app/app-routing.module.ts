import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'logearse', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'chat', component: ChatComponent },
  { path: '404', component: Error404Component }, 
  { path: '**', redirectTo: '404' }
  // {
  //   path: '',
  //   component: PrincipalComponent,
  //   children:
  //     [
  //       { path: 'inicio', component: InicioComponent },
  //       { path: 'logearse', component: LoginComponent },
  //       { path: 'registrarse', component: LoginComponent }
  //     ]
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
