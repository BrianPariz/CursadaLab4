import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
// import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioInterface, Perfil } from '../clases/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: UsuarioInterface;

    constructor(private afsAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
        this.UsuarioVacio();
    }

    RegistrarUsuario(email: string, password: string, nombre: string, fotoUrl: string) {
        return new Promise(() => {
            this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(
                    (userData) => {
                        return userData.user.updateProfile({
                            displayName: nombre,
                            photoURL: fotoUrl
                        });
                    },
                    (err) => console.log(err)
                )
                .then(
                    () => {
                        this.EstaLogeado().subscribe(
                            (userData) => {
                                if (userData) {
                                    this.usuario.Uid = userData.uid;
                                    this.usuario.Email = userData.email;
                                    this.usuario.ImagenUrl = userData.photoURL;
                                    this.usuario.Nombre = userData.displayName;
                                    this.usuario.Activo = false;
                                    this.db.collection('usuarios').doc(userData.uid).set(this.usuario);
                                }
                                else {
                                    this.UsuarioVacio();
                                }
                            },
                            (err) => console.log(err));
                        this.router.navigate(['']);
                    },
                    (err) => console.log(err)
                );
        });
    }

    LogearUsuario(email: string, password: string) {
        return new Promise(() => {
            this.afsAuth.auth.signInWithEmailAndPassword(email, password)
                .then(
                    (userData) => {
                        if (userData) {
                            this.usuario.Uid = userData.user.uid;
                            this.usuario.Email = userData.user.email;
                            this.usuario.ImagenUrl = userData.user.photoURL;
                            this.usuario.Nombre = userData.user.displayName;
                        }
                        else {
                            this.UsuarioVacio();
                        }
                    },
                    (err) => console.log(err));
        });
    }

    DeslogearUsuario() {
        this.afsAuth.auth.signOut();
        this.UsuarioVacio();
    }

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }

    UsuarioVacio() {
        this.usuario = {
            Uid: '',
            Nombre: '',
            Email: '',
            Password: '',
            ImagenUrl: "",
            Activo: false,
            Perfil: Perfil.Cliente
        }
    }
}
