import { UsuarioAltaComponent } from './componentes/usuario-alta/usuario-alta.component';
import { ActoresListadoComponent } from './componentes/actores-listado/actores-listado.component';
import { ActoresAltaComponent } from './componentes/actores-alta/actores-alta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { PeliculasAltaComponent } from './componentes/peliculas-alta/peliculas-alta.component';
import { ActoresComponent } from './componentes/actores/actores.component';
import { PeliculasGrillaComponent } from './componentes/peliculas-grilla/peliculas-grilla.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';

const routes: Routes = [
  { path: '' ,
    component: InicioComponent,
    children:
      [
        {path: 'peliculas', component: PeliculasComponent,
          children: [
            {path: '', component: PeliculasGrillaComponent},
            {path: 'alta', component: PeliculasAltaComponent}
          ]
        },
        {path: 'busqueda', component: BusquedaComponent},
        {path: 'registrarse', component: UsuarioAltaComponent},
        {path: 'logearse', component: UsuarioLoginComponent},
        {path: 'actor', component: ActoresComponent,
          children: [
            {path: 'listado', component: ActoresListadoComponent},
            {path: 'alta', component: ActoresAltaComponent}
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
