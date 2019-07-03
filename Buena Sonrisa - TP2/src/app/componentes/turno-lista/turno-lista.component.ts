import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { TurnoInterface } from 'src/app/clases/Turno';
import { MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-turno-lista',
  templateUrl: './turno-lista.component.html',
  styleUrls: ['./turno-lista.component.scss']
})
export class TurnoListaComponent implements OnInit {

  private displayedColumns: string[] = ['NombreEspecialista', 'Fecha', 'Estado'];
  private turnos: TurnoInterface[];
  private dataSource = new MatTableDataSource(this.turnos);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));

  constructor(private dataApi: DataApiService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.dataApi.TraerTodos('turnos')
      .subscribe(turnos => {
        this.turnos = turnos.filter(x => x.UidCliente == this.usuarioService.usuario.Uid);
        this.dataSource = new MatTableDataSource(this.turnos);
        this.noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
