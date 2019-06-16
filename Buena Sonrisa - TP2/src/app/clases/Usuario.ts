export enum Perfil {
    Cliente = 'Cliente',
    Recepcionista = 'Recepcionista',
    Especialista = 'Especialista',
    Administrador = 'Administrador'
}

export interface UsuarioInterface {
    Uid:string;
    Nombre:string;
    Email:string;
    Password:string;
    ImagenUrl?:string;
    Perfil?:Perfil;
    Activo?:boolean;
}
