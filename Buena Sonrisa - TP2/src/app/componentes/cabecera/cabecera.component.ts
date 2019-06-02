import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../servicios/Auth.service';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public usuario:Usuario;
  public estaLogeado: boolean = true;
  public imgUsuario: string;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.TraerUsuarioActual();
  }

  TraerUsuarioActual() {
    this.authService.EstaLogeado().subscribe(user => {
      if (user) {
        this.usuario.Nombre = user.displayName;
        this.usuario.Email = user.email;
        this.usuario.ImagenUrl = user.photoURL;
        this.estaLogeado = true;
      }
      else {
        this.estaLogeado = false;
      }
    })
  }

  Deslogearse() {
    this.afsAuth.auth.signOut();
  }
}
