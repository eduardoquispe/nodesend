import { 
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true
      }
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
        autenticado: null
      }
    case LOGIN_EXITOSO:
      sessionStorage.setItem('rns_token', action.payload)
      return {
        ...state,
        mensaje: null,
        token: action.payload,
        autenticado: true
      }
    case CERRAR_SESION:
      sessionStorage.removeItem('rns_token')
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null
      }
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null
      }
    default:
      return state;
  }
}