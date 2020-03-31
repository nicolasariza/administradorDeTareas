import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Tarea from "./components/Tarea";
import PropTypes from "prop-types";

function App() {
  // Tareas en localStorage
  let tareasIniciales = JSON.parse(localStorage.getItem("tareas"));
  if (!tareasIniciales) {
    tareasIniciales = [];
  }
  // Arreglo de tareas
  const [tareas, agregarTareas] = useState(tareasIniciales);

  // use effect para realizar operaciones cuando el state cambia( siempre es arrow function)
  //para ejecutar una sola vez se pasa un arreglo vacio al final "Similar ComponentDidMount"
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas, tareasIniciales]);

  // function que toma las tareas actuales y agrega las nuevas
  const crearTarea = tarea => {
    agregarTareas([...tareas, tarea]);
  };

  // function para eliminar las tareas
  const eliminarTarea = id => {
    //con el filter se recorre el arreglo de tareas y se filtra para que no traiga el id a eliminar
    const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
    agregarTareas(nuevasTareas);
  };

  const titulo = tareas.length === 0 ? "No hay tareas" : "Lista de tareas";

  return (
    <Fragment>
      <h1>Administrador de tareas</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Formulario crearTarea={crearTarea} />
          </div>
          <div className="col-sm-6">
            <h2>{titulo}</h2>
            {tareas.map(tarea => (
              <Tarea
                key={tarea.id}
                tarea={tarea}
                eliminarTarea={eliminarTarea}
              />
            ))}
          </div>
        </div>
      </div>
      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a
            className="text-dark"
            href="https://www.linkedin.com/in/nicolas-ariza/"
          >
            Nicolas Ariza
          </a>
        </div>
      </footer>
    </Fragment>
  );
}
//documentacion de codigo
Formulario.propTypes = {
  crearTarea: PropTypes.func.isRequired
};

export default App;
