import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioInterface, Perfil } from '../clases/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: UsuarioInterface;
    private redirectUrl: string = '/';
    private loginUrl: string = '/logearse';

    constructor(private afsAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private ns: NotificationsService) {
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
                    (err) => {
                        console.log(err);
                        this.UsuarioVacio();
                        this.ns.error("Error al registrarse", "El mail ya está en uso o hubo otro error");
                    }
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
                                    this.ns.success("Registro exitoso!");
                                    this.router.navigate(['']);
                                }
                                else {
                                    this.UsuarioVacio();
                                }
                            },
                            (err) => {
                                console.log(err);
                                this.UsuarioVacio();
                                this.ns.error("Error inesperado", "Sucedió un error inesperado.");
                            });
                    });
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
                            this.ns.success("Logeo exitoso!");
                            this.router.navigate(['']);
                        }
                        else {
                            this.UsuarioVacio();
                        }
                    },
                    (err) => {
                        console.log(err);
                        this.UsuarioVacio();
                        this.ns.error("Error al logearse", "Sucedió un error al logearse, intente.");
                    });
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

    isUserLoggedIn(): boolean {
        return this.afsAuth.auth.currentUser != null;
    }
    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }
    getLoginUrl(): string {
        return this.loginUrl;
    }
}
