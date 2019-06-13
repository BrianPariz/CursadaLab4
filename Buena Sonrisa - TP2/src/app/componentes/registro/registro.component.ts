import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UsuarioService } from '../../servicios/Usuario.service';
import { Usuario } from 'src/app/clases/Usuario';
import { finalize } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;

  public usuario: Usuario;
  public imgName: string;

  porcentajeUpload: Observable<number>;
  urlImagen: Observable<string>;
  noCargando = true;

  constructor(private usuarioService: UsuarioService, private storage: AngularFireStorage) {
    this.usuario = new Usuario();
    this.imgName = "Seleccionar imágen..";
  }

  ngOnInit() { }

  Registrarse() {
    var usuarioPhoto = this.InputImagenUser.nativeElement.value;
    this.usuarioService.RegistrarUsuario(this.usuario.Email, this.usuario.Password, this.usuario.Nombre, usuarioPhoto);
  }

  ImagenCargada(e) {
    this.noCargando = false;
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/usuarios/" + nombreImg + "-" + Date.now() + "." + ext;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, img);
      this.porcentajeUpload = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
    }
    else {
      this.imgName = "Seleccionar imágen..";
      this.urlImagen = empty();
      this.noCargando = true;
    }
  }
}
