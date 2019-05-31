import { Actor } from './../../clases/Actor';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Pelicula } from 'src/app/clases/Pelicula';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';

@Component({
  selector: 'app-actores-detalle',
  templateUrl: './actores-detalle.component.html',
  styleUrls: ['./actores-detalle.component.css']
})
export class ActoresDetalleComponent implements OnInit {

  @Input() actor:Actor;
  @Output() peliculas: Array<Pelicula>;
  private errorMsj;

  constructor(private peliService:PeliculaService) { }

  ngOnInit() {
    this.peliService.TraerTodos()
    .subscribe(
      data => {this.peliculas = data.filter(pelicula => pelicula.EstrellaPrincipal.toUpperCase() == this.actor.Nombre.toUpperCase()),
      error => this.errorMsj = error;
    });
  }

}
