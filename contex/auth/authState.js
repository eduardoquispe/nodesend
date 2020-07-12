import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import { 
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types/index';
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {
  const { children } = props

  //Definir un state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? sessionStorage.getItem('rns_token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null
  }

  //Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState) 

  //Registrar nuevos usuarios
  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos)

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      })

    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      })
    }
    //lIMPIA LA ALERT DESPUES DE 3 SEG
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  //Autenticar usuarios
  const iniciarSesion = async datos => {
    
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      })

    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      })
    }

    //lIMPIA LA ALERT DESPUES DE 3 SEG
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  // retorne el usuario autenticado en base al jwt
  const usuarioAutenticado = async () => {

    const token = window.sessionStorage.getItem('rns_token')
    if (token) {
      tokenAuth(token)

      try {
        const respuesta = await clienteAxios.get('/api/auth')
        if (respuesta.data.usuario) {
          dispatch({
            type: USUARIO_AUTENTICADO,
            payload: respuesta.data.usuario
          })
        }
        
      } catch (error) {
        console.log(error)
        dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.msg
        })
      }
    }

  }

  //Cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <authContext.Provider 
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      { children }
    </authContext.Provider>
  )
}

export default AuthState;