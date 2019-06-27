import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public estaLogeado: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.TraerUsuarioActual();
  }

  TraerUsuarioActual() {
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        this.usuarioService.usuario.ImagenUrl = user.photoURL;
        this.usuarioService.usuario.Nombre = user.displayName;
        this.usuarioService.usuario.Email = user.email;
        this.usuarioService.usuario.Uid = user.uid;
        this.estaLogeado = true;
      }
      else {
        this.estaLogeado = false;
      }
    });
  }

  Deslogearse() {
    this.usuarioService.DeslogearUsuario();
  }
}
