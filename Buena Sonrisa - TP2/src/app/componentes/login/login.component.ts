import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/Usuario.service';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usuario:Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) 
  { 
    this.usuario = new Usuario();
  }

  ngOnInit() { }

  Logearse() {
    this.usuarioService.LogearUsuario(this.usuario.Email, this.usuario.Password)
    .then(() => {
      this.router.navigate(['']);
    })
    .catch(err => {
      console.log('err', err.message)
    })
  }
}
