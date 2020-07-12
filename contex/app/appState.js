import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../config/axios';
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGA_NUMERO_DESCARGAS
} from '../../types';

const AppState = ({ children }) => {

  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  }

  //Crear dispatch y state
  const [state, dispatch] = useReducer(appReducer, initialState)

  //Muestra una alerta
  const mostrarAlerta = msg => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  //Subir los archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    
    dispatch({
      type: SUBIR_ARCHIVO
    })

    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg
      })
    }

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 3000);
  }

  //Crea un enlace una ves que se subio el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password
    }

    try {
      const resultado = await clienteAxios.post('/api/enlaces', data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      })
    } catch (error) {
      console.log(error)
      
    }

  }

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE
    })
  }

  //Agregar password
  const agregarPassword = password => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  //Agregar un numero de descargas
  const agregaDescargas = descargas => {
    dispatch({
      type: AGREGA_NUMERO_DESCARGAS,
      payload: descargas
    })
  }

  return ( 
      <appContext.Provider
        value={{
          mensaje_archivo: state.mensaje_archivo,
          nombre: state.nombre,
          nombre_original: state.nombre_original,
          cargando: state.cargando,
          descargas: state.descargas,
          password: state.password,
          autor: state.autor,
          url: state.url,
          mostrarAlerta,
          subirArchivo,
          crearEnlace,
          limpiarState,
          agregarPassword,
          agregaDescargas
        }}
      >
        { children }
      </appContext.Provider>
   );
}
 
export default AppState;