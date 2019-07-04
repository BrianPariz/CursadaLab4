// export enum EstadoTurno {
//     Pendiente = 'Pendiente',
//     Cancelado = 'Cancelado',
//     Finalizado = 'Finalizado'
// }

export interface MateriaInterface {
    Nombre: string;
    Cuatrimestre: string;
    Cupos: number;
    ProfesorNombre: string;
    ProfesorUid: string;
    Alumnos: Array<string | string>;
    // Estado: EstadoTurno;
}