import {Usuario} from '../models/Usuario.ts'

export const getUsuario = async () => {
  let usuario = await Usuario.select('usuario_id').get();
  console.log(usuario)
  return usuario
}

