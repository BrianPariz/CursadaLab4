import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/clases/Pelicula';

@Component({
  selector: 'app-peliculas-grilla-sin-borrar',
  templateUrl: './peliculas-grilla-sin-borrar.component.html',
  styleUrls: ['./peliculas-grilla-sin-borrar.component.css']
})
export class PeliculasGrillaSinBorrarComponent implements OnInit {

  @Input() peliculas: Array<Pelicula>;

  constructor() { }

  ngOnInit() {
  }

  CargarPeliculas(pelis:Array<Pelicula>) {
      this.peliculas = pelis;
  }
}
