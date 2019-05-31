import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {

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
