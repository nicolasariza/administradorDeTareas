import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
// componente que recibe como parametros props.agregarTareas
const Formulario = ({ crearTarea }) => {
  // crear el state de tareas
  const [tarea, actualizarTarea] = useState({
    nombreTarea: "",
    responsable: "",
    fecha: "",
    hora: "",
    descripcion: ""
  });

  const [error, actualizarError] = useState(false);

  //arrow function que se ejecuta cuando el usuario escribe en los input
  const handleChange = e => {
    //modifica el state
    actualizarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const { nombreTarea, responsable, fecha, hora, descripcion } = tarea;

  // al enviar formulario
  const handleSubmit = e => {
    e.preventDefault();

    //validacion campos vacíos
    /*
    * La siguiente es una validacion que se realiza recorriendo los valores del objeto tarea y 
    remplaza el siguiente codigo:
    if(nombreTarea === ''){
        actualizarError(true)
    */

    const isEmpty = str => str.trim() === "";
    const keys = Object.keys(tarea);
    //para que descripcion sea opcional
    keys.pop();
    const fields = keys.filter(key => isEmpty(tarea[key]));
    if (fields.length > 0) {
      actualizarError(true);
      return;
    }
    // actualiza el error a falso para quitar el mensaje de error
    actualizarError(false);
    //genera un id unico
    tarea.id = uuid();
    //agregar objeto al state de APP.js
    crearTarea(tarea);

    // limpiar datos del formulario
    actualizarTarea({
      nombreTarea: "",
      responsable: "",
      fecha: "",
      hora: "",
      descripcion: ""
    });
  };
  return (
    <Fragment>
      <h2>Crear recordatorio</h2>
      <form onSubmit={handleSubmit}>
        {error ? (
          <div className="alert alert-danger" role="alert">
            No pueden haber campos vacíos!
          </div>
        ) : null}
        <div className="form-group">
          <label>Nombre de la tarea</label>
          <input
            type="text"
            name="nombreTarea"
            className="form-control"
            placeholder="Ingrese la tarea"
            onChange={handleChange}
            value={nombreTarea}
          />
          <label>Nombre del responsable</label>
          <input
            type="text"
            name="responsable"
            className="form-control"
            placeholder="Ingrese el responsable"
            onChange={handleChange}
            value={responsable}
          />
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            onChange={handleChange}
            value={fecha}
          />
          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className="form-control"
            onChange={handleChange}
            value={hora}
          />
          <label>Descripcion (opcional)</label>
          <textarea
            name="descripcion"
            className="form-control"
            onChange={handleChange}
            value={descripcion}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
