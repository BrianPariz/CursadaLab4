import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeliculaService } from 'src/app/servicios/Pelicula.service';
import { Pelicula } from 'src/app/clases/Pelicula';

@Component({
  selector: 'app-btn-borrar',
  templateUrl: './btn-borrar.component.html',
  styleUrls: ['./btn-borrar.component.css']
})
export class BtnBorrarComponent implements OnInit {

  @Output() borrado:EventEmitter<number> = new EventEmitter<number>();
  @Input() id:number;

  constructor(private peliService:PeliculaService) { }

  ngOnInit() {
  }

  public Borrar():void{
    this.peliService.BorrarUno(this.id)
    .then( () =>{
      this.borrado.emit(this.id);
    });
  }
}
