import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from './Usuario.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('Url:' + url);
    if (this.usuarioService.isUserLoggedIn()) {
      return true;
    }
    this.usuarioService.setRedirectUrl(url);
    this.router.navigate([this.usuarioService.getLoginUrl()]);
    return false;
  }
}