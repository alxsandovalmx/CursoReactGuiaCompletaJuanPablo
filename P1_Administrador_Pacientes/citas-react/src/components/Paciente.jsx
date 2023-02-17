// Estructura basica de un componente en React

const Paciente = ( {paciente, setPaciente, eliminarPaciente} ) => {
  // Lógica del Componente

  // Destructuring del Objeto Paciente
  const { nombre, propietario, email, fecha, sintomas, id } = paciente;

  // Funcion handleEliminar para la eliminacion de un Paciente
  const handleEliminar = ()=>{

    const respuesta = confirm('¿Deseas eliminar el paciente?');
    
    if( respuesta ){
        eliminarPaciente( id );
    }

  };

  return (
    // Parte Visible del componente    
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
            <span className="font-normal normal-case">{nombre}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
            <span className="font-normal normal-case">{propietario}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
            <span className="font-normal normal-case">{email}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Fecha de Alta: {''}
            <span className="font-normal normal-case">{fecha}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: {''}
            <span className="font-normal normal-case">{sintomas}</span>
        </p>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={ ()=> setPaciente( paciente )}
        >Editar</button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={ handleEliminar }
        >Eliminar</button>        
      </div>  

    </div>
  )
}

export default Paciente;
