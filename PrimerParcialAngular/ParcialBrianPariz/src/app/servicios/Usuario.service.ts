import { Usuario } from 'src/app/clases/Usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainHttpService } from 'src/app/servicios/MainHttp.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public mainHttpService:MainHttpService<Usuario>) { }

  public TraerUno(id:number): Observable<Usuario> {
    return this.mainHttpService.GetHttp('usuarios/', id);
  }

  public TraerTodos(): Observable<Usuario[]> {
    return this.mainHttpService.GetAllHttp('usuarios/');
  }

  public CrearUno(prod:Usuario) {
    return this.mainHttpService.PostHttp('usuarios/', prod);
  }

  public ModificarUno(id:number, prod:Usuario) {
    return this.mainHttpService.PutHttp('usuarios/', id, prod);
  }

  public BorrarUno(id:number) {
    return this.mainHttpService.DeleteHttp('usuarios/', id);
  }
}
