import React, { useState, useEffect } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/solar/bootstrap.min.css";

import styles from "./admin.module.css";
import { getImageUrl } from "../../utils";

export const Admin = () => {
  const [selectedTable, setSelectedTable] = useState(1);
  const [rooms, setRooms] = useState("");
  const [reservations, setReservations] = useState("");
  const [fecha_llegada, setFecha_llegada] = useState("");
  const [fecha_salida, setFecha_salida] = useState("");
  const [total_pago, setTotal_pago] = useState("");
  const [token, setToken] = useState(0);
  const [cliente, setCliente] = useState(0);
  const [habitacion, setHabitacion] = useState("");

  const [id_reservation, setId] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getRooms();
    getReservations();
  }, []);

  const getRooms = () => {
    Axios.get("http://localhost:3001/getRooms")
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar el error aquí
        console.error("Error en la solicitud Axios:", error.message);
      });
  };

  const getReservations = () => {
    Axios.get("http://localhost:3001/getReservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log("Error: No se pueden obtener las reservaciones", error);
      });
  };

  const add = () => {
    Axios.post("http://localhost:3001/createReservation", {
      fecha_llegada: fecha_llegada,
      fecha_salida: fecha_salida,
      total_pago: total_pago,
      id_habitacion: habitacion,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al insertar en la base de datos:", error);
      });
  };

  //FUNCION EDIT
  const update = () => {
    Axios.put(`http://localhost:3001/updateReservation`, {
      id_reservacion: id_reservation,
      fecha_llegada: fecha_llegada,
      fecha_salida: fecha_salida,
      total_pago: total_pago,
      id_usuario: cliente,
      id_habitacion: habitacion,
    })
      .then(() => {
        alert("Reservacion actualizado con éxito");
        limpiarCampos();
        setEditar(false);
        getReservations();
      })
      .catch((error) => {
        console.error("Error al actualizar reservacion:", error);
      });
  };

  const deleteReservation = (idReservacion) => {
    Axios.delete(`http://localhost:3001/deleteReservation/${idReservacion}`)
      .then(() => {
        console.log("Reservacion eliminada con éxito");
        getReservations();
      })
      .catch((error) => {
        console.error("Error al eliminar reservacion:", error);
      });
  };

  const limpiarCampos = () => {
    setFecha_llegada("");
    setFecha_salida("");
    setTotal_pago("");
    setHabitacion("");
    setEditar(false);
  };

  const editarReservation = (reservation) => {
    console.log(reservation);
    setId(reservation.id_reservacion);
    setFecha_llegada(parseISO(reservation.fecha_llegada));
    setFecha_salida(parseISO(reservation.fecha_salida));
    setTotal_pago(reservation.total_pago);
    setHabitacion(reservation.id_habitacion);
    setCliente(reservation.id_usuario);
    setEditar(true);
  };

  const handleArrivalDateChange = (date) => {
    setFecha_llegada(date);
  };

  const handleDepartureDateChange = (date) => {
    setFecha_salida(date);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-sm-4">
            <div className="container">
              <div
                className="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
                style={{ marginBottom: "100px" }}
              >
                <button type="button" className="btn btn-primary">
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
                  <div
                    className="dropdown-menu"
                    aria-labelledby="btnGroupDrop1"
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedTable(1)}
                    >
                      Historial de reservaciones
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedTable(0)}
                    >
                      Habitaciones
                    </button>
                  </div>
                </div>
              </div>

              {selectedTable === 0 && rooms.length > 0 && (
                <table className="table table-primary table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Tipo de habitacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr className="table-dark" key={room.id_habitacion}>
                        <th scope="row">{room.id_habitacion}</th>
                        <td>{room.estado}</td>
                        <td>{room.tipo_de_habitacion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 1 && reservations.length > 0 && (
                <table className="table table-primary table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID Reservacion</th>
                      <th scope="col">Fecha de Llegada</th>
                      <th scope="col">Fecha de Salida</th>
                      <th scope="col">Total de pago</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Habitacion</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation, key) => (
                      <tr
                        className="table-dark"
                        key={reservation.id_reservacion}
                      >
                        <th scope="row">{reservation.id_reservacion}</th>
                        <td>{reservation.fecha_llegada}</td>
                        <td>{reservation.fecha_salida}</td>
                        <td>${reservation.total_pago}</td>
                        <td>{reservation.id_usuario}</td>
                        <td>{reservation.id_habitacion}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              onClick={() => editarReservation(reservation)}
                              className="btn btn-warning"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                deleteReservation(reservation.id_reservacion)
                              }
                              className="btn btn-danger"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable !== 0 && selectedTable !== 1 && (
                <p>No hay datos disponibles</p>
              )}
            </div>
          </div>
          <div className="col-sm-4" style={{ marginLeft: "400px" }}>
            <form>
              <fieldset>
                <legend>Ingrese aquí los datos de su reservaciones</legend>
                <div>
                  <p>Arrival Date:</p>
                  <DatePicker
                    selected={fecha_llegada}
                    onChange={handleArrivalDateChange}
                  />
                </div>
                <div>
                  <p>Departure Date:</p>
                  <DatePicker
                    selected={fecha_salida}
                    onChange={handleDepartureDateChange}
                  />
                </div>

                <label class="form-label mt-4">Total de pago:</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => setTotal_pago(event.target.value)}
                    value={total_pago}
                    placeholder="Ingrese el tipo de comida del restaurante"
                  />
                  <span class="input-group-text">.00</span>
                </div>

                <div className="form-group">
                  <label className="col-form-label mt-4" htmlFor="inputDefault">
                    Habitacion
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setHabitacion(event.target.value)}
                    className="form-control"
                    value={habitacion}
                    placeholder="Ingrese la latitud del lugar"
                  />
                </div>

                {editar ? (
                  <div>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => update(id_reservation)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn btn-info m-2"
                      onClick={() => {
                        limpiarCampos();
                        setEditar(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-success" onClick={add}>
                    Registrar
                  </button>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
