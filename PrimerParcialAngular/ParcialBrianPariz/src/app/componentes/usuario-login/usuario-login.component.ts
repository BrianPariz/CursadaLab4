import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Usuario } from './../../clases/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  private usuarios:Array<Usuario>;
  private usuario:Usuario;
  private emailError:boolean;
  private claveError:boolean;

  constructor(private userService:UsuarioService) { }

  ngOnInit() {
    this.ReestablecerTodo();
  }

  ReestablecerTodo() {
    this.usuario = new Usuario();
    this.emailError = false;
    this.claveError = false;
  }

  Agregar() {
    if (this.ValidarCampos() != false) {

      this.userService.TraerTodos()
      .subscribe(
        data => this.usuarios = data
      );

      alert("Se logeó correctamente!");
      this.ReestablecerTodo();
    }
  }

 ValidarCampos() {
    let result = true;

    if(this.usuario.Email == "" || this.usuario.Email == undefined) {
      this.emailError = true;
        result = false;
    }
    if(this.usuario.Clave == "" || this.usuario.Clave == undefined) {
      this.claveError = true;
        result = false;
    }

    return result;
  }
}
