import { ActorService } from './../../servicios/Actor.service';
import { Actor } from 'src/app/clases/Actor';
import { Component, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/clases/Pelicula';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';

@Component({
  selector: 'app-actores-listado',
  templateUrl: './actores-listado.component.html',
  styleUrls: ['./actores-listado.component.css']
})
export class ActoresListadoComponent implements OnInit {

  @Output() peliculas: Array<Pelicula>;
  private actores:Array<Actor>;
  private errorMsj;

  constructor(private actorService:ActorService, private peliService:PeliculaService) { }

  ngOnInit() {
    this.actorService.TraerTodos()
    .subscribe(
      data => this.actores = data,
      error => this.errorMsj = error
    );
  }
}
