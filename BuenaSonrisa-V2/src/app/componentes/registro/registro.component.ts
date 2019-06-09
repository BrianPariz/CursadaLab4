import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInterface, Perfil } from 'src/app/clases/Usuario';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @ViewChild("imgUsuario", { static: false }) InputImagenUser: ElementRef;

  public imgName: string;
  public cargandoImg: boolean;
  public urlImagen: Observable<string>;

  public usuario: UsuarioInterface = {
    Nombre: '',
    Email: '',
    Password: '',
    ImagenUrl: "",
    Perfil: Perfil.Cliente
  }

  constructor(private usuarioService: UsuarioService) {
    this.imgName = "Seleccionar imágen..";
    this.cargandoImg = false;
  }

  ngOnInit() { 
    this.DatosPrueba();
  }

  Registrarse() {
    this.usuario.Perfil = Perfil[(<HTMLInputElement>document.getElementById("perfil")).value];
    this.usuarioService.CreateUsuario(this.usuario);
  }

  ImagenCargada(e) {
    this.cargandoImg = true;
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/usuarios/" + nombreImg + "-" + Date.now() + "." + ext;
      // const ref = this.storage.ref(filePath);
      // const task = this.storage.upload(filePath, img);
      // task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
    }
    else {
      this.imgName = "Seleccionar imágen..";
    }

    this.cargandoImg = false;
  }

  DatosPrueba() {
    this.usuario.Nombre = "Pedro";
    this.usuario.Email = "picapiedra@gmail.com";
    this.usuario.Password = "olaquetal";
  }
}
