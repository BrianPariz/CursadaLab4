import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { UsuarioInterface } from '../clases/Usuario';


@Injectable({
  providedIn: 'root'
})
export class DataApiServiceUser implements OnInit {

  /* #region  Constructor */

  constructor(private afs: AngularFirestore, private ns: NotificationsService) {
    this.coleccion = this.afs.collection<UsuarioInterface>('usuarios');

    console.log('Inicialice');
  }

  /* #endregion */

  ngOnInit(): void {

  }

  /* #region  Atributos */

  private coleccion: AngularFirestoreCollection<UsuarioInterface>;
  private listaObservable: Observable<UsuarioInterface[]>;
  private doc: AngularFirestoreDocument<UsuarioInterface>;
  private unaMateriaObservable: Observable<UsuarioInterface>;
  // public seleccionado: UsuarioInterface = {
  //   Uid: ''
  // };

  /* #endregion */

  /* #region  Métodos */

  agregar(unaMateria: UsuarioInterface): void {
    this.coleccion.add(unaMateria).then(() => {
      this.ns.success("Se agregó correctamente");
    }).catch(() => {
      this.ns.error("Hubo un error");
    });
  }

  eliminar(id: string): void {
    this.doc = this.afs.doc<UsuarioInterface>(`usuarios/${id}`); // Filtramos por id
    this.doc.delete();
  }

  actualizar(unamateria: UsuarioInterface): void {
    const id = unamateria.Uid;
    this.doc = this.afs.doc<UsuarioInterface>(`usuarios/${id}`); // Filtramos por id
    this.doc.update(unamateria);
  }

  traerTodos() {
    // return this.listaObservable
    return this.listaObservable = this.coleccion.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UsuarioInterface;
          data.Uid = action.payload.doc.id;
          return data;
        });
      })); // todo esto es para poder traernos el id (lo crea automaticamente firebase en nuestra coleccion)
  }

}
