import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioInterface, Perfil } from 'src/app/clases/Usuario';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { TurnoInterface, EstadoTurno } from 'src/app/clases/Turno';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-turno-creacion',
  templateUrl: './turno-creacion.component.html',
  styleUrls: ['./turno-creacion.component.scss']
})
export class TurnoCreacionComponent implements OnInit {

  minDate = new Date(Date.now());
  especialistas: UsuarioInterface[];
  formTurnos: FormGroup;
  mostrar = true;
  constructor(private fb: FormBuilder, private dataApi: DataApiService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.especialistas = [];

    this.formTurnos = this.fb.group({
      fecha: [Validators.required],
      especialista: [Validators.required]
    });

    this.dataApi.TraerTodos('usuarios').subscribe(usuarios => {
      this.especialistas = usuarios.filter(x => x.Perfil == Perfil.Especialista && x.Activo);
    });
  }

  get fecha() {
    return this.formTurnos.get('fecha');
  }

  get especialista() {
    return this.formTurnos.get('especialista');
  }

  CrearTurno() {
    let especialista = this.formTurnos.get('especialista').value;

    let turno: TurnoInterface = {
      UidCliente: this.usuarioService.usuario.Uid,
      NombreCliente: this.usuarioService.usuario.Nombre,
      UidEspecialista: especialista.Uid,
      NombreEspecialista: especialista.Nombre,
      Fecha: this.formTurnos.get('fecha').value,
      Estado: EstadoTurno.Pendiente
    }
    
    this.dataApi.AgregarUno(turno, 'turnos');
  }

  TraerEspecialistasPorFecha() {
    
  }

}
