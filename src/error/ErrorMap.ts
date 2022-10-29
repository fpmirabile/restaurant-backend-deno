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
    PERMISOS_INSUFICIENTES: new ErrorType("Usted no posee permisos para realizar esta accion", 401),
    USUARIO_INEXISTENTE: new ErrorType("Usuario Invalido", 401),
    USUARIO_EXISTENTE: new ErrorType("El email ya se encuentra en uso"),
    RESTAURANT_INEXISTENTE: new ErrorType("El restaurante no existe"),
    CATEGORIA_INEXISTENTE: new ErrorType("La categoria no existe"),
    PLATO_EXISTENTE: new ErrorType("El plato que intenta agregar, ya existe"),
    PLATO_NO_EXISTENTE: new ErrorType("El plato seleccionado no existe"),
    CLOUDINARY_ERROR: new ErrorType("Ocurrio un error al subir la imagen", 500),
    
}
