import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';
import { Pelicula } from 'src/app/clases/Pelicula';

@Component({
  selector: 'app-input-buscar',
  templateUrl: './input-buscar.component.html',
  styleUrls: ['./input-buscar.component.css']
})
export class InputBuscarComponent implements OnInit {

  @Output() resultadoBuscar : EventEmitter<Pelicula[]> = new EventEmitter<Pelicula[]>();
  private peliculas: Array<Pelicula>;
  private errorMsj;
  public modelo : string;

  constructor(private peliService:PeliculaService) { }

  ngOnInit() {
  }

  // public BuscarClicked() {
  //   if(this.modelo == undefined)
  //     return false;

  //   this.peliService.TraerTodos()
  //   .subscribe(
  //     data => {this.peliculas = data.filter(pelicula => pelicula.Nombre.toUpperCase() == this.modelo.toUpperCase()),
  //     error => this.errorMsj = error;
  //     if(this.peliculas.length < 1){
  //       alert("No se encontraron resultados");
  //     }
  //     else{
  //       this.resultadoBuscar.emit(this.peliculas);
  //     }
  //   });
  // }
}
