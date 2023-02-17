// Estructura basica de un componente en React

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  // Lógica del Componente
  const [ pacientes, setPacientes ] = useState( () => JSON.parse(localStorage.getItem('pacientes')) || [] );
  const [ paciente, setPaciente ] = useState({});

  // Uso del useEffect que se ejecuta cuando el componente esta listo
  // Se consulta la informacion que hay en el LocalStorage
  // useEffect( ()=> {

  //   const obtenerLS = () => {
  //     // LocalStorage solo almacenta texto o Json, por lo que se tranforma a un arreglo
  //     const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  //     setPacientes( pacientesLS );
  //   }
  //   obtenerLS();

  // }, []);

  // Uso del useEffect para guardar en LocalStorage la informacion
  // Se sincroniza cuando hay un cambio en pacientes
  useEffect( () => {
      localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  },[pacientes]);

  // Funcion para eliminar un Paciente al dar clic en el formulario
  // Esto es pasar Prop de Hijo al Padre
  const eliminarPaciente = id => {

    // Se identifica el id en el que se ha dado clic en eliminar
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );
    setPacientes( pacientesActualizados );

  };  

  return (
    // Parte Visible del componente
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes     = {pacientes}
          setPacientes  = {setPacientes}
          paciente      = {paciente}
          setPaciente   = {setPaciente}
        />
        <ListadoPacientes
          pacientes         = {pacientes}
          setPaciente       = {setPaciente}
          eliminarPaciente  = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App;

