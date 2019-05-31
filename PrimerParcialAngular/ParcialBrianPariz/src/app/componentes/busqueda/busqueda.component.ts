import { Component, OnInit, Input, Output } from '@angular/core';
import { Pelicula } from 'src/app/clases/Pelicula';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @Output() peliculas: Array<Pelicula>;

  constructor() { }

  ngOnInit() {
  }

  CargarPeliculas(pelis:Array<Pelicula>) {
    this.peliculas = pelis;
  }
}
