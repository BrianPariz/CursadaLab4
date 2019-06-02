import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../servicios/Auth.service';
import { Usuario } from 'src/app/clases/Usuario';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @ViewChild("imgUsuario", { static: false }) InputImagenUser:ElementRef;

  private usuario: Usuario;
  public imgName: string;

  urlImagen: Observable<string>;

  constructor(private authService: AuthService, private router: Router, private storage: AngularFireStorage) {
    this.usuario = new Usuario();
    this.imgName = "Seleccionar imágen..";
  }

  ngOnInit() {
  }

  Registrarse() {
    this.authService.RegistrarUsuario(this.usuario.Email, this.usuario.Password)
      .then(res => {
        this.authService.EstaLogeado().subscribe(usuario => {
          if (usuario) {
            usuario.updateProfile({
              displayName: this.usuario.Nombre,
              photoURL: this.InputImagenUser.nativeElement.value
            }).then(() => {
              this.router.navigate(['']);
            }).catch((err) => {
              console.log(err.message);
            })
          }
        })
      })
      .catch(err => {
        console.log('err', err.message);
      })
  }

  ImagenCargada(e) {
    const img = e.target.files[0];

    if (img != undefined) {
      this.imgName = img.name;
      const nombreImg = img.name.substr(0, img.name.lastIndexOf('.'));
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const filePath = "imagenes/usuarios/" + nombreImg + "-" + Date.now() + "." + ext;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, img);
      task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();
    }
    else {
      this.imgName = "Seleccionar imágen..";
    }
  }
}
