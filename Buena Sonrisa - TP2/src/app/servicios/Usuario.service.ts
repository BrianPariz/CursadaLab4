import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    registrarUsuarioEmitter = new EventEmitter();

    constructor(private afsAuth: AngularFireAuth, private router: Router) { }

    RegistrarUsuario(email: string, password: string, nombre: string, fotoUrl: string) {
        return new Promise(() => {
            this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(userData => {
                    userData.user.updateProfile({
                        displayName: nombre,
                        photoURL: fotoUrl
                    }).then(() => {
                        this.EstaLogeado().subscribe(user => {
                            if (user) {
                                this.registrarUsuarioEmitter.emit(user);
                            }
                        });
                        this.router.navigate(['']);
                    });
                });
            err => console.log(err);
        });
    }

    LogearUsuario(email: string, password: string) {
        return new Promise((resolve) => {
            this.afsAuth.auth.signInWithEmailAndPassword(email, password)
                .then(userData => resolve(userData),
                    err => console.log(err));
        });
    }

    DeslogearUsuario() {
        this.afsAuth.auth.signOut();
    }

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }
}
