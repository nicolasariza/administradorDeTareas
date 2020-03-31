import React, { Fragment } from "react";

const Tarea = ({ tarea, eliminarTarea }) => {
  //const keys = Object.keys(tarea);
  //console.log(keys);
  let fecha = new Date(tarea.fecha);
  fecha = fecha.toString().split(" ")[0];
  
  return (
    <div className="card bg-light mb-3">
      <div className="card-body">
        <p className="card-text">
          <strong>Tarea:</strong> {tarea.nombreTarea} <br />
          <strong>Responsable: </strong>
          {tarea.responsable}
          <br />
          <strong>Fecha: </strong>
          {fecha} {tarea.fecha}
          <br />
          <strong>Hora: </strong>
          {tarea.hora}
          {tarea.descripcion.trim() === "" ? null : (
            <Fragment>
              <br /> <strong>Descripcion: </strong>
              {tarea.descripcion}
            </Fragment>
          )}
          <br />
        </p>

        <button
          className="btn btn-danger"
          onClick={() => eliminarTarea(tarea.id)}
        >
          Eliminar tarea
        </button>
      </div>
    </div>
  );
};

export default Tarea;

/*
{keys.map(llave => (
          <p className="card-text">
            {llave == "id" ? null : <strong>{llave} : </strong>}
            {llave == "id" ? null : tarea[llave]}
          </p>
        ))}
*/
