import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from './Usuario.service';
import { Perfil } from '../clases/Usuario';

@Injectable()
export class AuthGuardAdminService implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('Url:' + url);
    
    if (this.usuarioService.isUserLoggedIn()  && this.usuarioService.usuario.Perfil == Perfil.Administrador ) {
      return true;
    }
    this.usuarioService.setRedirectUrl(url);
    this.router.navigate([this.usuarioService.getLoginUrl()]);
    return false;
  }
}