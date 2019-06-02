import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/Auth.service';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usuario:Usuario;

  constructor(private authService: AuthService, private router: Router, ) 
  { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  Logearse() {
    this.authService.LogearUsuario(this.usuario.Email, this.usuario.Password)
    .then(res => {
      this.router.navigate([''])
    })
    .catch(err => {
      console.log('err', err.message)
    })
  }
}
