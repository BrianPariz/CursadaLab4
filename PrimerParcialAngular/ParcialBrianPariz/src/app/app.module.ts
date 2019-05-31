import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { ActoresComponent } from './componentes/actores/actores.component';
import { PeliculasGrillaComponent } from './componentes/peliculas-grilla/peliculas-grilla.component';
import { BtnBorrarComponent } from './componentes/btn-borrar/btn-borrar.component';
import { PeliculasAltaComponent } from './componentes/peliculas-alta/peliculas-alta.component';
import { InputBuscarComponent } from './componentes/input-buscar/input-buscar.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ActoresAltaComponent } from './componentes/actores-alta/actores-alta.component';
import { ActoresListadoComponent } from './componentes/actores-listado/actores-listado.component';
import { PeliculasGrillaSinBorrarComponent } from './componentes/peliculas-grilla-sin-borrar/peliculas-grilla-sin-borrar.component';
import { ActoresDetalleComponent } from './componentes/actores-detalle/actores-detalle.component';
import { UsuarioAltaComponent } from './componentes/usuario-alta/usuario-alta.component';
import { UsuarioLoginComponent } from './componentes/usuario-login/usuario-login.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PeliculasComponent,
    ActoresComponent,
    PeliculasGrillaComponent,
    BtnBorrarComponent,
    PeliculasAltaComponent,
    InputBuscarComponent,
    BusquedaComponent,
    ActoresAltaComponent,
    ActoresListadoComponent,
    PeliculasGrillaSinBorrarComponent,
    ActoresDetalleComponent,
    UsuarioAltaComponent,
    UsuarioLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
