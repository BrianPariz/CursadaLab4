import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainHttpService } from 'src/app/servicios/MainHttp.service';
import { Pelicula } from 'src/app/clases/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(public mainHttpService:MainHttpService<Pelicula>) { }

  public TraerUno(id:number): Observable<Pelicula> {
    return this.mainHttpService.GetHttp('peliculas/', id);
  }

  public TraerTodos(): Observable<Pelicula[]> {
    return this.mainHttpService.GetAllHttp('peliculas/');
  }

  public CrearUno(prod:Pelicula) {
    return this.mainHttpService.PostHttp('peliculas/', prod);
  }

  public ModificarUno(id:number, prod:Pelicula) {
    return this.mainHttpService.PutHttp('peliculas/', id, prod);
  }

  public BorrarUno(id:number) {
    return this.mainHttpService.DeleteHttp('peliculas/', id);
  }
}
