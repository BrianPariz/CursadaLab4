import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Boton1ComponentComponent } from './componentes/boton1-component/boton1-component.component';
import { Boton2ComponentComponent } from './componentes/boton2-component/boton2-component.component';
import { Boton3ComponentComponent } from './componentes/boton3-component/boton3-component.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Boton1ComponentComponent,
    Boton2ComponentComponent,
    Boton3ComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
