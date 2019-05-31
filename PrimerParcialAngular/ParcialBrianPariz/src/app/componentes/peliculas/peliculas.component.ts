import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  private mostrarListado:boolean; 
  constructor(){}

  ngOnInit() {
  }

  CambiarVisibilidadListado() {
    if(this.mostrarListado) {
      this.mostrarListado = false;
    }
    else {
      this.mostrarListado = true;
    }
  }
}