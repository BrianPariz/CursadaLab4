import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { MaterialModule } from './componentes/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './servicios/AuthGuard.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { UserMailComponent } from './componentes/user-mail/user-mail.component';
import { AltaMateriasComponent } from './componentes/alta-materias/alta-materias.component';
import { ListadoMateriasComponent } from './componentes/listado-materias/listado-materias.component';
import { AuthGuardAdminService } from './servicios/AuthGuard.Admin.service';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CabeceraComponent,
    PieComponent,
    LoginComponent,
    InicioComponent,
    Error404Component,
    RegistroComponent,
    ChatComponent,
    UserMailComponent,
    AltaMateriasComponent,
    ListadoMateriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MaterialModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    })
  ],
  exports: [
    MaterialModule,
    SimpleNotificationsModule
  ],
  providers: [AuthGuardService, AuthGuardAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
