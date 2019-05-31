import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.css']
})
export class UsuarioAltaComponent implements OnInit {

  public usuario:Usuario;
  private nombreError:boolean;
  private emailError:boolean;
  private claveError:boolean;
  private perfilError:boolean;

  constructor(private userService:UsuarioService) { }

  ngOnInit() {
    this.ReestablecerTodo();
  }

  ReestablecerTodo() {
    this.usuario = new Usuario();
    this.nombreError = false;
    this.emailError = false;
    this.claveError = false;
    this.perfilError = false;
  }

  Agregar() {
    if (this.ValidarCampos() != false) {
      this.userService.CrearUno(this.usuario);
      alert("Se agregó el usuario correctamente!");
      this.ReestablecerTodo();
    }
  }

 ValidarCampos() {
    let result = true;

    if(this.usuario.Nombre == "" || this.usuario.Nombre == undefined) {
      this.nombreError = true;
        result = false;
    }
    if(this.usuario.Email == "" || this.usuario.Email == undefined) {
      this.emailError = true;
        result = false;
    }
    if(this.usuario.Clave == "" || this.usuario.Clave == undefined) {
      this.claveError = true;
        result = false;
    }
    if(this.usuario.Perfil == "null" || this.usuario.Perfil == undefined) {
      this.perfilError = true;
        result = false;
    }

    return result;
  }

}
