import { Component, OnInit, Output, Input } from '@angular/core';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';
import { Pelicula } from 'src/app/clases/Pelicula';

@Component({
  selector: 'app-peliculas-grilla',
  templateUrl: './peliculas-grilla.component.html',
  styleUrls: ['./peliculas-grilla.component.css']
})
export class PeliculasGrillaComponent implements OnInit {

  private peliculas:Array<Pelicula>;
  private errorMsj;

  constructor(private peliService:PeliculaService) { }

  ngOnInit() {
    this.peliService.TraerTodos()
      .subscribe(
        data => this.peliculas = data,
        error => this.errorMsj = error
      );
  }

  RefrescarLista(id:number) {
    this.peliculas = this.peliculas.filter(item => item.id != id);
  }
}
