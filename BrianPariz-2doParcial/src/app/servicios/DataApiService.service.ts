import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMateria } from '../clases/IMateria';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class DataApiService implements OnInit {

  /* #region  Constructor */

  constructor(private afs: AngularFirestore, private ns:NotificationsService) {
    this.coleccion = this.afs.collection<IMateria>('materias');

    console.log('Inicialice');
  }

  /* #endregion */

  ngOnInit(): void {

  }

  /* #region  Atributos */

  private coleccion: AngularFirestoreCollection<IMateria>;
  private listaObservable: Observable<IMateria[]>;
  private doc: AngularFirestoreDocument<IMateria>;
  private unaMateriaObservable: Observable<IMateria>;
  public seleccionado: IMateria = {
    id: null
  };

  /* #endregion */

  /* #region  Métodos */

  agregar(unaMateria: IMateria): void {
    this.coleccion.add(unaMateria).then(() => {
      this.ns.success("Se agregó correctamente");
    }).catch(()=> {
      this.ns.error("Hubo un error");
    });
  }

  eliminar(id: string): void {
    this.doc = this.afs.doc<IMateria>(`materias/${id}`); // Filtramos por id
    this.doc.delete();
  }

  actualizar(unamateria: IMateria): void {
    const id = unamateria.id;
    this.doc = this.afs.doc<IMateria>(`materias/${id}`); // Filtramos por id
    this.doc.update(unamateria);
  }

  traerTodos() {
    // return this.listaObservable
    return this.listaObservable = this.coleccion.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as IMateria;
        data.id = action.payload.doc.id;
        return data;
      });
    })); // todo esto es para poder traernos el id (lo crea automaticamente firebase en nuestra coleccion)
  }

  
  /* #endregion */

}
