import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataApiService } from 'src/app/servicios/DataApiService.service';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.scss']
})
export class ListadoMateriasComponent implements OnInit {

  listadoMaterias;

  constructor( private db: AngularFirestore, private das: DataApiService) {

  }

  ngOnInit() {
    this.das.traerTodos()
    .subscribe(listadoMaterias => {
      this.listadoMaterias = listadoMaterias;
    });
  }

}
