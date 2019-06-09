import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../clases/Usuario';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuariosCollection: AngularFirestoreCollection<UsuarioInterface>;
    usuarios: Observable<UsuarioInterface[]>;
    usuarioDoc: AngularFirestoreDocument<UsuarioInterface>;

    constructor(public asf: AngularFirestore) {
        this.usuariosCollection = asf.collection<UsuarioInterface>('usuarios');
        this.usuarios = this.usuariosCollection.valueChanges();
        // this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
        //     map(actions => actions.map(a => {
        //         const data = a.payload.doc.data() as UsuarioInterface;
        //         const id = a.payload.doc.id;
        //         return {id, ...data};
        //     }))
        // );
    }

    GetUsuario(id: string) {
    }

    GetAllUsuarios() {
        return this.usuarios = this.usuariosCollection.snapshotChanges()
            .pipe(map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as UsuarioInterface;
                    data.Id = action.payload.doc.id;
                    return data;
                });
            }));
    }

    CreateUsuario(usuario: UsuarioInterface) {
        this.usuariosCollection.add(usuario);
    }

    UpdateUsuario(usuario: UsuarioInterface) {
        this.usuarioDoc = this.asf.doc<UsuarioInterface>('usuarios/' + usuario.Id);
        this.usuarioDoc.update(usuario);
    }

    DeleteUsuario(id: string) {
        this.usuarioDoc = this.asf.doc<UsuarioInterface>('usuarios/' + id);
        this.usuarioDoc.delete();
    }
}
