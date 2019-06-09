export enum Perfil {
    Cliente = 'Cliente',
    Recepcionista = 'Recepcionista',
    Especialista = 'Especialista',
    Administrador = 'Administrador'
}

export interface UsuarioInterface {
    Id?:string;
    Nombre?:string;
    Email?:string;
    Password?:string;
    ImagenUrl?:string;
    Perfil?:Perfil;
}
