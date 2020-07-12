import React, { useContext, useEffect } from 'react';
import authContext from '../../contex/auth/authContext'; 
import appContext from '../../contex/app/appContext'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {

  const AuthContext = useContext(authContext) 
  const { usuario ,cerrarSesion, usuarioAutenticado} = AuthContext;

  //Context de la aplicacion
  const AppContext = useContext(appContext) 
  const { limpiarState } = AppContext;

  const router = useRouter()

  const redireccionar = () => {
    limpiarState()
    router.push('/')
  }

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return ( 
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
    
      <img
        className='w-64 mb-8 md:mb-0 curso-pointer' src="/logo.svg" alt=""
        onClick={() => redireccionar()}  
      />

      <div>
      {
        usuario ? (
          <div className='flex items-center'>
            <p>Hola { usuario.nombre}</p>
            <button 
              className='ml-2 bg-black px-5 py-3 rounded text-white font-bold uppercase'
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <Link href='/login'>
              <a className='bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2'>Iniciar sesión</a>
            </Link>
            <Link href='/crearcuenta'>
              <a className='bg-black px-5 py-3 rounded text-white font-bold uppercase'>Crear cuenta</a>
            </Link>
          </>
        )
      }
      </div>
    </header>
   );
}
 
export default Header;