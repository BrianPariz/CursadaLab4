import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Perfil } from 'src/app/clases/Usuario';
import { IMateria } from 'src/app/clases/IMateria';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataApiService } from 'src/app/servicios/DataApiService.service';
import { DataApiServiceUser } from 'src/app/servicios/DataApiServiceUser.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-alta-materias',
  templateUrl: './alta-materias.component.html',
  styleUrls: ['./alta-materias.component.scss']
})
export class AltaMateriasComponent implements OnInit {

  nombreModel: string = '';
  profesorModel: string = '';
  cuposModel: number = 0;
  listadoUsuarios;
  materia: IMateria = {};

  constructor(private usuarioService: UsuarioService, private db: AngularFirestore, private das: DataApiService, private das2: DataApiServiceUser, private ns: NotificationsService) {

  }

  ngOnInit() {
    this.cuposModel = 0;
    this.nombreModel = "";
    this.profesorModel = "";
    this.materia = {};

    this.das2.traerTodos()
    .subscribe(listadoUsuarios => {
      this.listadoUsuarios = listadoUsuarios;
    });
  }

  async Alta() {
    this.materia.cuatrimestre = (<HTMLInputElement>document.getElementById("cuatri")).value;
    this.materia.cupos = this.cuposModel;
    this.materia.nombre = this.nombreModel;
    this.materia.profesor = this.profesorModel;

    this.cuposModel = 0;
    this.nombreModel = "";
    this.profesorModel = "";


    this.listadoUsuarios.forEach(element => {
      if(element.Perfil == Perfil.Profesor && element.Nombre == this.materia.profesor){
        this.das.agregar(this.materia);
        this.ns.success("se agrego con exito");
        return;
      }
    });
    this.das.agregar(this.materia);

    this.materia = {};
    
    this.ns.error("ese profesor no existe");
  }

}
