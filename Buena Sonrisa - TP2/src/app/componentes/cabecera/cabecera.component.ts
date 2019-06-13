import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/Usuario.service';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public usuario: Usuario;
  public estaLogeado: boolean = true;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.TraerUsuarioActual();

    this.usuarioService.registrarUsuarioEmitter.subscribe(user => {
      this.usuario.ImagenUrl = user.photoURL;
      this.usuario.Nombre = user.displayName;
    });
  }

  TraerUsuarioActual() {
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        if (user.photoURL != null) {
          this.usuario.ImagenUrl = user.photoURL;
        } else {
          this.usuario.ImagenUrl = "assets/img/default-user.png";
        }
        this.usuario.Nombre = user.displayName;
        this.usuario.Email = user.email;
        this.estaLogeado = true;
      }
      else {
        this.estaLogeado = false;
      }
    })
  }

  Deslogearse() {
    this.usuarioService.DeslogearUsuario();
  }
}
