// Estructura basica de un componente en React
import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ( { pacientes, setPacientes, paciente, setPaciente } ) => {
// Lógica del Componente

  // Creacion de State del Componente
  // Estos son los valores iniciales del formulario
  const [ nombre, setNombre ]           = useState( '' );
  const [ propietario, setPropietario ] = useState( '' );
  const [ email, setEmail ]             = useState( '' );
  const [ fecha, setFecha ]             = useState( '' );
  const [ sintomas, setSintomas ]       = useState( '' );

  // Uso del Hook useEffect
  useEffect( ()=>{

    // Se comprueba si un arreglo esta vacio
    // Los valores son los que estan en memoria al hacer click en editar
    if( Object.keys(paciente).length > 0 ){

      setNombre( paciente.nombre );
      setPropietario( paciente.propietario );
      setEmail( paciente.email );
      setFecha( paciente.fecha );
      setSintomas( paciente.sintomas );

    }

  }, [paciente]);

  
  // State de Alerta
  const [ error, setError ] = useState( false );

  // Funcion que genera un ID unico
  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  // Funcion asociada al evento Submit del formulario
  const handleSubmit = e => {

    e.preventDefault();

    // Validacion del Formulario
    if( [ nombre, propietario, email, fecha, sintomas ].includes('') ){

      // Cambio del State de la Alerta
      setError( true );

      return;
    }

    // Cambio del State de la Alerta
    setError( false );

    // Objeto Paciente en memoria de lo que se lee del formulario
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,

    }

    // Validacion del tipo de registro: Editar o Nuevo
    if( paciente.id ){
      // Editando el registro
      // Se asigna al objeto en memoria el ID del registro previo
      objetoPaciente.id = paciente.id;

      // Valida que el Paciente editado se actualice con la info del Paciente en el Formulario
      const pacientesActualizados = pacientes.map(
        pacienteState => pacienteState.id === paciente.id 
                                          ? objetoPaciente : pacienteState );

      setPacientes( pacientesActualizados );

      // Se limpia el Paciente en memoria
      setPaciente( {} );

    } else{
      // Nuevo registro
      // Generacion de ID unico para nuevo registro
      objetoPaciente.id = generarId();

      // Se modifica el State de la variable Paciente con la funcion modificadora setPacientes
      // Se toma lo que hay en el State y se agrega el nuevo elemento      
      setPacientes( [...pacientes, objetoPaciente] );      
    }

    // Se guarda la informacion y se reinicia el formulario
    // Al dejar el valor del State en vario, los values asociados se limpian automaticamente
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  };

  return (
    // Parte Visible del componente
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento de Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Agrega Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>
      <form
        onSubmit={ handleSubmit }
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' action="">

        { error && <Error>Todos los Campos son Obligatorios</Error> }

        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor="mascota">Nombre de la Mascota</label>
          <input 
            id='mascota'
            type="text"
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={ nombre }
            onChange={ e => setNombre( e.target.value ) }
          />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre del Propietario</label>
          <input 
            id='propietario'
            type="text"
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario}
            onChange={ e => setPropietario( e.target.value ) }
          />
        </div>      
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor="email">Email del Propietario</label>
          <input 
            id='email'
            type="email"
            placeholder='Email del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={ e => setEmail( e.target.value ) }            
          />
        </div>    
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">Fecha de Alta</label>
          <input 
            id='alta'
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={ e => setFecha( e.target.value ) }            
          />
        </div>           
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor="sintomas">Síntomas</label>
          <textarea 
            id="sintomas" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los síntomas'
            value={sintomas}
            onChange={ e => setSintomas( e.target.value ) }            
          />
        </div>
        <input 
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>

  )
}

export default Formulario;
