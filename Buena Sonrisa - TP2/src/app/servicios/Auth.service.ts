import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afsAuth: AngularFireAuth) { }

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

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }
}
