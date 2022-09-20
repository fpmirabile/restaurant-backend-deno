type MapError = Record<string, ErrorType>;

export class ErrorType {

    message:string
    status:number

    constructor(message:string, status=406){
        this.message = message
        this.status = status
    }
    
}


export const ErrorMap: MapError = {
    CREDENCIALES_INVALIDAS: new ErrorType("Las credenciales ingresadas son invalidas", 401),
    CONTRASEÑAS_DIFERENTES: new ErrorType("Las contraseñas ingresadas no coinciden"),
    JWT_SECRET: new ErrorType("Error de configuracion"),
    JWT_CREATE: new ErrorType("Error al generar el token"),
    USUARIO_INEXISTENTE: new ErrorType("Usuario Invalido", 401),
    USUARIO_EXISTENTE: new ErrorType("El email ya se encuentra en uso"),
    CLOUDINARY_ERROR: new ErrorType("Ocurrio un error al subir la imagen", 500),
    
}
