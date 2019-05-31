import { Boton1ComponentComponent } from './componentes/boton1-component/boton1-component.component';
import { Boton3ComponentComponent } from './componentes/boton3-component/boton3-component.component';
import { Boton2ComponentComponent } from './componentes/boton2-component/boton2-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  { path: 'Inicio' ,
component: InicioComponent ,
children:
     [{path: 'Boton1' , component: Boton1ComponentComponent},
     {path: 'Boton2' , component: Boton2ComponentComponent},
     {path: 'Boton3' , component: Boton3ComponentComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
