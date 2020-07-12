import React, { useState, useContext } from 'react';
import BasicLayout from '../../components/layout/BasicLayout';
import clienteAxios from '../../config/axios';
import appContext from '../../contex/app/appContext';
import Alerta from '../../components/Alerta';


export async function getServerSideProps({params}) {
  const { enlace } = params
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`)

  console.log(resultado)
  return {
    props: {
      enlace: resultado.data
    }
  }
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get('/api/enlaces')
  console.log(enlaces)
  return {
    paths: enlaces.data.enlaces.map(enlace => ({
      params: { enlace: enlace.url }
    })),
    fallback: false
  }
}

export default ({enlace}) => {

  const AppContext = useContext(appContext);
  const { mensaje_archivo, mostrarAlerta } = AppContext

  const [tienePassword, setTienePasswrod] = useState(enlace.password)
  const [password, setpassword] = useState('')

  const veirificarPassword = async e => {
    e.preventDefault()
    console.log('s')
    const data = {
      password
    }
    try {
      const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data)
      console.log(resultado.data)
      setTienePasswrod(resultado.data.password)
    } catch (error) {
      mostrarAlerta(error.response.data.msg)
    }


  }

  return (
    <BasicLayout>
    {
      tienePassword ? (
        <>
          <p className='text-center'>Este enlace esta protegido por una contraseña, coloquela a continuación</p>
          {mensaje_archivo && <Alerta/>}
          <div className="w-full mt-3 max-w-lg mx-auto">
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
              onSubmit={e => veirificarPassword(e)}
            >
               <div className="mb-4">
                <label 
                  htmlFor="password"
                  className='block text-black text-sm font-bold mb-2'
                >
                  Contraseña
                </label>
                <input 
                  type="password"
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  
                  id='password'
                  placeholder='Contraseña del enlace'
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                />
                
              </div>
              <input 
                type="submit"
                className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                value='Validar contraseña'
              />
            </form>
          </div>
        </>
      ) : (
        <>
        <h1 className='text-4xl text-center text-gray-700'>
        Descarga tu archivo
      </h1>
      <div className='flex items-center justify-center mt-10'>
        <a
          download
          href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
          className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'>
          Aquí
        </a>
      </div>
        </>
      )
    }
    
     
    </BasicLayout>
  )
}