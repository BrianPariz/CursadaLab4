import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/clases/Pelicula';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-peliculas-alta',
  templateUrl: './peliculas-alta.component.html',
  styleUrls: ['./peliculas-alta.component.css']
})
export class PeliculasAltaComponent implements OnInit {

  public pelicula:Pelicula;
  private nombreError:boolean;
  private tipoError:boolean;
  private fechaDeEstrenoError:boolean;
  private cantPublicoError:boolean;
  private estrellaError:boolean;

  constructor(private peliService:PeliculaService, private router: Router) { }

  ngOnInit() {
    this.ReestablecerTodo();
  }

  ReestablecerTodo() {
    this.pelicula = new Pelicula();
    this.nombreError = false;
    this.tipoError = false;
    this.fechaDeEstrenoError = false;
    this.cantPublicoError = false;
    this.estrellaError = false;
  }

  Agregar() {
    if (this.ValidarCampos() != false) {
      this.pelicula.PathFoto = "../../../assets/imagenes/movie.jpg"
      this.peliService.CrearUno(this.pelicula);
      alert("Se agregó la Película correctamente!");
      this.ReestablecerTodo();
    }
  }

 ValidarCampos() {
    let result = true;

    if(this.pelicula.Nombre == "" || this.pelicula.Nombre == undefined) {
      this.nombreError = true;
        result = false;
    }
    if(this.pelicula.Tipo == "null" || this.pelicula.Tipo == undefined) {
      this.tipoError = true;
        result = false;
    }
    if(this.pelicula.FechaDeEstreno == null || this.pelicula.FechaDeEstreno == undefined) {
      this.fechaDeEstrenoError = true;
        result = false;
    }
    if(this.pelicula.CantDePublico == null || this.pelicula == undefined) {
      this.cantPublicoError = true;
        result = false;
    }
    if(this.pelicula.EstrellaPrincipal == "" || this.pelicula.EstrellaPrincipal == undefined) {
      this.estrellaError = true;
        result = false;
    }

    return result;
  }
}
