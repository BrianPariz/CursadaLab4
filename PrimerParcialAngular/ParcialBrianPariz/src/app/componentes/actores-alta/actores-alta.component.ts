import { Actor } from 'src/app/clases/Actor';
import { ActorService } from 'src/app/servicios/Actor.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-actores-alta',
  templateUrl: './actores-alta.component.html',
  styleUrls: ['./actores-alta.component.css']
})
export class ActoresAltaComponent implements OnInit {

  public actor:Actor;
  private nombreError:boolean;
  private apellidoError:boolean;
  private nacionalidadError:boolean;
  private fechaDeNacimientoError:boolean;

  constructor(private actorService:ActorService, private router: Router) { }

  ngOnInit() {
    this.ReestablecerTodo();
  }

  ReestablecerTodo() {
    this.actor = new Actor();
    this.nombreError = false;
    this.apellidoError = false;
    this.nacionalidadError = false;
    this.fechaDeNacimientoError = false;
  }

  Agregar() {
    if (this.ValidarCampos() != false) {
      this.actorService.CrearUno(this.actor);
      alert("Se agregó el actor correctamente!");
      this.ReestablecerTodo();
    }
  }

 ValidarCampos() {
    let result = true;

    if(this.actor.Nombre == "" || this.actor.Nombre == undefined) {
      this.nombreError = true;
        result = false;
    }
    if(this.actor.Apellido == "" || this.actor.Apellido == undefined) {
      this.apellidoError = true;
        result = false;
    }
    if(this.actor.Nacionalidad == "" || this.actor.Nacionalidad == undefined) {
      this.nacionalidadError = true;
        result = false;
    }
    if(this.actor.FechaDeNacimiento == null || this.actor.FechaDeNacimiento == undefined) {
      this.fechaDeNacimientoError = true;
        result = false;
    }

    return result;
  }
}
