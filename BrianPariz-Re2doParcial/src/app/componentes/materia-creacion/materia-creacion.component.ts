import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioInterface, Perfil } from 'src/app/clases/Usuario';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { MateriaInterface } from 'src/app/clases/Materia';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-materia-creacion',
  templateUrl: './materia-creacion.component.html',
  styleUrls: ['./materia-creacion.component.scss']
})
export class MateriaCreacionComponent implements OnInit {

  // minDate = new Date(Date.now());
  profesores: UsuarioInterface[];
  formMaterias: FormGroup;
  mostrar = true;
  constructor(private fb: FormBuilder, private dataApi: DataApiService) { }

  ngOnInit() {
    this.profesores = [];

    this.formMaterias = this.fb.group({
      nombre: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cuatrimestre: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      cupos: [null, [Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      profesor: [null, [Validators.required]]
    });

    this.dataApi.TraerTodos('usuarios').subscribe(usuarios => {
      this.profesores = usuarios.filter(x => x.Perfil == Perfil.Profesor);
    });
  }

  // get fecha() {
  //   return this.formMaterias.get('fecha');
  // }

  get nombre() {
    return this.formMaterias.get('nombre');
  }
  get cuatrimestre() {
    return this.formMaterias.get('cuatrimestre');
  }
  get cupos() {
    return this.formMaterias.get('cupos');
  }
  get profesor() {
    return this.formMaterias.get('profesor');
  }

  CrearMateria() {
    let profesor = this.formMaterias.get('profesor').value;

    let materia: MateriaInterface = {
      Nombre: this.formMaterias.get('nombre').value,
      Cuatrimestre: this.formMaterias.get('cuatrimestre').value,
      Cupos: this.formMaterias.get('cupos').value,
      ProfesorNombre: profesor.Nombre,
      ProfesorUid: profesor.Uid
    }

    this.dataApi.AgregarUno(materia, 'materias');
  }

  // TraerProfesoresPorFecha() {

  // }

}
