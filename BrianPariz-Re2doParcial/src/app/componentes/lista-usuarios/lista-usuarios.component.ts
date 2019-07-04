import { Component, OnInit, Input } from '@angular/core';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { UsuarioInterface } from 'src/app/clases/Usuario';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  private displayedColumns: string[] = ['Imágen', 'Nombre', 'Email', 'Perfil'];
  private usuarios: UsuarioInterface[];
  private dataSource;
  
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.TraerTodos('usuarios')
      .subscribe(users => {
        this.usuarios = users;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.Perfil.toLowerCase().includes(filter);
        };
      });
  }

  // activarDesactivar(uid: string) {

  //   let usuario = this.usuarios.filter(x => x.Uid == uid)[0];

  //   if (usuario) {
  //     usuario.Activo = usuario.Activo ? false : true;

  //     this.dataApi.ModificarUno(usuario, 'usuarios');
  //     this.usuarios.find(x => x.Uid == uid).Activo = usuario.Activo;
  //   }
  // }

  aplicarFiltros(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
