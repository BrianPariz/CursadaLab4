import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainHttpService } from 'src/app/servicios/MainHttp.service';
import { Actor } from 'src/app/clases/Actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(public mainHttpService:MainHttpService<Actor>) { }

  public TraerUno(id:number): Observable<Actor> {
    return this.mainHttpService.GetHttp('actores/', id);
  }

  public TraerTodos(): Observable<Actor[]> {
    return this.mainHttpService.GetAllHttp('actores/');
  }

  public CrearUno(prod:Actor) {
    return this.mainHttpService.PostHttp('actores/', prod);
  }

  public ModificarUno(id:number, prod:Actor) {
    return this.mainHttpService.PutHttp('actores/', id, prod);
  }

  public BorrarUno(id:number) {
    return this.mainHttpService.DeleteHttp('actores/', id);
  }
}
