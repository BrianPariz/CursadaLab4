import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases/Usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private usuario:Usuario;

    constructor(private afsAuth: AngularFireAuth) 
    { 
        this.usuario = new Usuario();
    }

    RegistrarUsuario(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userData => resolve(userData),
                    err => reject(err));
        })
    }

    LogearUsuario(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afsAuth.auth.signInWithEmailAndPassword(email, password)
                .then(userData => resolve(userData),
                    err => reject(err));
        })
    }

    DeslogearUsuario() {
        this.afsAuth.auth.signOut();
    }

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }
}
