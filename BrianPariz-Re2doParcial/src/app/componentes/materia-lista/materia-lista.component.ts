import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { MateriaInterface } from 'src/app/clases/Materia';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Perfil } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-materia-lista',
  templateUrl: './materia-lista.component.html',
  styleUrls: ['./materia-lista.component.scss']
})
export class MateriaListaComponent implements OnInit {

  // private displayedColumns : string[] = ['NombreMateria', 'Cuatrimestre', 'Cupos', 'NombreProfesor'];
  private columsAdministrador: string[] = ['NombreMateria', 'Cuatrimestre', 'Cupos', 'NombreProfesor'];
  private columsProfesor: string[] = ['NombreMateria', 'Cuatrimestre', 'Cupos', 'Alumnos'];
  private columsAlumno: string[] = ['NombreMateria', 'Cuatrimestre', 'Cupos', 'NombreProfesor', 'Inscribirse'];

  private materias: MateriaInterface[];
  private dataSource = new MatTableDataSource(this.materias);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));

  private perfil;

  constructor(private dataApi: DataApiService, private us: UsuarioService) {
    this.perfil = this.us.usuario.Perfil;
  }

  ngOnInit() {
    this.dataApi.TraerTodos('materias')
      .subscribe(materias => {

        if (this.perfil == Perfil.Profesor) {
          this.materias = materias.filter(x => x.ProfesorUid == this.us.usuario.Uid);
        }
        else if (this.us.usuario.Perfil == Perfil.Alumno) {
          this.materias = materias;
        }
        else {
          this.materias = materias;
        }

        this.dataSource = new MatTableDataSource(this.materias);
        this.noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
      });
  }

  estaInscripto(alumnos) {
    var retorno = false;

    if (alumnos && alumnos.length > 0) {
      alumnos.forEach(element => {
        if (element['uid'] == this.us.usuario.Uid) {
          retorno = true;
        }
      });
    }
    
    return retorno;
  }

  inscribirse(materia) {
    materia.Alumnos.push({ uid: this.us.usuario.Uid, nombre: this.us.usuario.Nombre });
    materia.Cupos = materia.Cupos - 1;
    this.dataApi.ModificarUno(materia, "materias");
  }

  mostrarInscriptos(alumnos) {
    
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
