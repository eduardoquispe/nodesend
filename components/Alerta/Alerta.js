import React, { useContext } from 'react';
import authContext from '../../contex/auth/authContext'; 
import appContext from "../../contex/app/appContext";


const Alerta = () => {

  //Extraer mensaje de error par usuarios
  const AuthContext = useContext(authContext) 
  const { mensaje } = AuthContext;
  //Extraer mensaje de error par aarchivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo } = AppContext;

  return ( 
    <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
      { mensaje_archivo || mensaje}
    </div>
   );
}
 
export default Alerta;