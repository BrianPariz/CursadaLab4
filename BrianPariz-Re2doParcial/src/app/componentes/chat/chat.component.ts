import { OnInit, Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Mensaje } from 'src/app/clases/Mensaje';
import { map, filter } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { MateriaInterface } from 'src/app/clases/Materia';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private mensajesCollection: AngularFirestoreCollection<Mensaje>;
  mensajes: Observable<Mensaje[]>;
  mensaje: Mensaje;
  materias: MateriaInterface[];
  materiaSeleccionada: string;

  constructor(private afs: AngularFirestore, private usuarioService: UsuarioService, private ns: NotificationsService, private dataApi: DataApiService) {
    this.mensaje = new Mensaje();
    this.mensajesCollection = afs.collection<Mensaje>('mensajes');
    // this.mensajes = this.mensajesCollection.valueChanges().pipe(
    //   map(lessons => lessons.sort((a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime()))
    // );

    this.EnterPresionado = this.EnterPresionado.bind(this);
    document.addEventListener('keypress', this.EnterPresionado);
  }

  ngOnInit() {
    this.dataApi.TraerTodos('materias').subscribe(materias => {
      this.materias = materias;
    });
  }

  NuevoMensaje() {

    if (this.mensaje.Mensaje == undefined || this.mensaje.Mensaje.trim() == '') {
      return;
    }

    this.mensaje.UserUid = this.usuarioService.usuario.Uid;
    this.mensaje.UrlImagen = this.usuarioService.usuario.ImagenUrl;
    this.mensaje.Nombre = this.usuarioService.usuario.Nombre;
    this.mensaje.Materia = this.materiaSeleccionada;
    this.mensaje.Fecha = Date.now();
    this.mensajesCollection.add({ 'Mensaje': this.mensaje.Mensaje, 'Fecha': this.mensaje.Fecha, 'UserUid': this.mensaje.UserUid, 'UrlImagen': this.mensaje.UrlImagen, 'Nombre': this.mensaje.Nombre, 'Materia': this.mensaje.Materia }); //new Mensaje(msj, Date.now(), this.usuarioService.usuario.Uid));
    this.mensaje = new Mensaje();
  }

  EnterPresionado(event: any) {
    if (event.which === 13) {
      this.NuevoMensaje();
    }
  }

  traerChatPorMateria() {
    debugger;
    this.mensajes = this.mensajesCollection.valueChanges().pipe(
      map(lessons => lessons.filter(x => x.Materia == this.materiaSeleccionada).sort((a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime()))
    );
  }
}