import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { take } from 'rxjs/operators';
import { Perfil } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public estaLogeado: boolean;
  administrador = false;
  profesor = false;
  alumno = false;

  constructor(private usuarioService: UsuarioService, private dataApi: DataApiService) { }

  ngOnInit() {
    this.TraerUsuarioActual();
  }

  TraerUsuarioActual() {
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
          this.usuarioService.usuario = userx;

          switch (this.usuarioService.usuario.Perfil) {
            case Perfil.Administrador:
              this.administrador = true;
              this.alumno = false;
              this.profesor = false;
              break;
            case Perfil.Alumno:
              this.alumno = true;
              this.administrador = false;
              this.profesor = false;
              break;
            case Perfil.Profesor:
              this.profesor = true;
              this.administrador = false;
              this.alumno = false;
              break;
          }

        });
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
