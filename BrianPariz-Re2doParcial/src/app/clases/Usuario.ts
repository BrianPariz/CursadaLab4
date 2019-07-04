export enum Perfil {
    Alumno = 'Alumno',
    Profesor = 'Profesor',
    Administrador = 'Administrador'
}

export interface UsuarioInterface {
    Uid:string;
    Nombre:string;
    Email:string;
    Password:string;
    ImagenUrl?:string;
    Perfil?:Perfil;
    // Activo?:boolean;
}
