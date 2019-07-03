import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataApiServiceUser } from 'src/app/servicios/DataApiServiceUser.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  listadoUsuarios;

  constructor( private db: AngularFirestore, private das: DataApiServiceUser) {

  }

  ngOnInit() {
    this.das.traerTodos()
    .subscribe(listadoUsuarios => {
      this.listadoUsuarios = listadoUsuarios;
    });
  }
}