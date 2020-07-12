import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from '../../contex/app/appContext';
import authContext from '../../contex/auth/authContext';
import Formulario from "../Formulario";

const Dropzone = () => {

  const AppContext = useContext(appContext);
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext

   //Context de la aplicacion
   const AuthContext = useContext(authContext) 
   const { usuario, autenticado } = AuthContext;

  const onDropRejected = () => {
    mostrarAlerta('No se pudo subir el archivo, el limite es de 1MB, obten una cuenta gratis para subir archivos mas grandes')
  }

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //Crear un form data
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);
    subirArchivo(formData, acceptedFiles[0].path)
    
  }, []);

  //Extraer conternido de Dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivos = acceptedFiles.map((archivo, index) => (
    <li className="bg-white flex-1 p-3 mb-4 shadow-lg rounded" key={index}>
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className='mt-10 w-full'>
          <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
          <ul>{archivos}</ul>

          {
            autenticado && <Formulario/>
          }

          { cargando ? (
            <p>Subiendo archivo...</p>
          ) : (
            <button
            className='bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800'
            type='button'
            onClick={() => crearEnlace()}
            >
              Crear enlace
            </button>
          )}

        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo aquí
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrastralo aquí
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Seleccciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
