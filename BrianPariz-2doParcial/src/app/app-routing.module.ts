import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { AuthGuardService } from './servicios/AuthGuard.service';
import { AltaMateriasComponent } from './componentes/alta-materias/alta-materias.component';
import { ListadoMateriasComponent } from './componentes/listado-materias/listado-materias.component';
import { AuthGuardAdminService } from './servicios/AuthGuard.Admin.service';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'logearse', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'alta-materias', component: AltaMateriasComponent, canActivate: [ AuthGuardAdminService ] },
  { path: 'listado-materias', component: ListadoMateriasComponent, canActivate: [ AuthGuardAdminService ] },
  { path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [ AuthGuardAdminService ] },
  { path: 'chat', component: ChatComponent, canActivate: [ AuthGuardService ] },
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
