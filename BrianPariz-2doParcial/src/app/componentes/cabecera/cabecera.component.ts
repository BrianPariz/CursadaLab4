import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Perfil } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public estaLogeado: boolean = true;
  public esAdmin: boolean = false;

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
        if(this.usuarioService.usuario.Perfil == Perfil.Administrador) {
          this.esAdmin = true;
        }
        this.estaLogeado = true;
      }
      else {
        this.esAdmin = false;
        this.estaLogeado = false;
      }
    });
  }

  Deslogearse() {
    this.usuarioService.DeslogearUsuario();
  }
}
