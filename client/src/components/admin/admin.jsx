import React, { useState, useEffect } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";

import styles from "./admin.module.css";
import { getImageUrl } from "../../utils";

export const Admin = () => {
  const [selectedTable, setSelectedTable] = useState(0);
  const [rooms, setRooms] = useState("");
  const [reservations, setReservations] = useState("");

  useEffect(() => {
    getRooms();
    getReservations();
  }, []);

  const getRooms = () => {
    Axios.get("http://localhost:3001/getRooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log("Error: No se pueden obtener las habitaciones", error);
      });
  };

  const getReservations = () => {
    Axios.get("http://localhost:3001/getReservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log("Error: No se pueden obtener las habitaciones", error);
      });
  }

  return (
    <>
      <div className="container">
        <div
          class="btn-group"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" class="btn btn-primary">
            Vista
          </button>
          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <button className="dropdown-item" onClick={() => setSelectedTable(0)}>
                Habitaciones
              </button>
              <button className="dropdown-item" onClick={() => setSelectedTable(1)}>
                Historial de reservaciones
              </button>
            </div>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Estado</th>
              <th scope="col">Tipo de habitacion</th>
            </tr>
          </thead>
          <tbody>
            {selectedTable === 0 && rooms.length > 0 ? (
              rooms.map((room) => (
                <tr className="table-primary">
                  <th scope="row">{room.id_habitacion}</th>
                  <td>{room.estado}</td>
                  <td>{room.tipo_de_habitacion}</td>
                </tr>
              ))
            ) : selectedTable === 1 && rooms.length > 0 ? (
                reservations.map((reservation) => (
                  <tr className="table-primary">
                    <th scope="row">{reservation.id_reservacion}</th>
                    <td>{reservation.fecha_llegada}</td>
                    <td>{reservation.fecha_salida}</td>
                  </tr>
                ))
              ): (
                <tr className="table-primary">
                <th scope="row">No hay datos disponibles</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
