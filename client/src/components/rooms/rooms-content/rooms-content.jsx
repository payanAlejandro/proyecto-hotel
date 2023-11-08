import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "./rooms-content.module.css";
import { getImageUrl } from "../../../utils";
import DatePicker from "react-datepicker";
import { differenceInDays } from 'date-fns'; // Importa la función differenceInDays
import "react-datepicker/dist/react-datepicker.css";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51O2gfuJw0dovYyK3ViteKYgwaQz7Fh3fDPUDkqFrzI7zoIQ5c6EcT43rAjU37s4QvJaQJqGqE2uvllPbPS0SoWDI00NywlwgMx");

export function Rooms_content() {

//CONSTANTES PARA EL MODAL
const [selectedRoom, setSelectedRoom] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [arrivalDate, setArrivalDate] = useState(null);
const [departureDate, setDepartureDate] = useState(null);
const [numberOfNights, setNumberOfNights] = useState(null); // Estado para almacenar el número de noches
const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);


//CONSTANTES PARA LOS FETCH
const [habitaciones, setHabitaciones] = useState("")
const [usuario, setUsuario] = useState(null);
const [fecha_llegada, setFecha_llegada] = useState("")
const [fecha_salida, setFecha_salida] = useState("")

total_pago = selectedRoom.precio * numberOfNights

//SECCION PARA LOS FETCH
useEffect(() => {
    getHabitaciones();
    getUsuario();
  }, []);

  const getHabitaciones = () => {
    Axios.get("http://localhost:3001/getRooms")
      .then((response) => {
        setHabitaciones(response.data);
      })
      .catch((error) => {
        mostrarMensajeError("Error", "No se pueden obtener los empleados: " + obtenerMensajeDeError(error));
      });
  }

  const getUsuario = () => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    Axios.get("http://localhost:3001/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setUsuario(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
//FUNCIONES PARA EL MODAL
const handlePayment = async (e) => {
  e.preventDefault();

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: Elements.getElement(CardElement),
  });
  setLoading(true);

  if (!error) {
    // console.log(paymentMethod)
    const { id } = paymentMethod;
    try {
      const { data } = await Axios.post(
        "http://localhost:3001/createReservation",
        {
          id,
          fecha_llegada: fecha_llegada,
          fecha_salida: fecha_salida,
          total_pago: total_pago,
          id_usuario: id_usuario,
          id_habitacion: id_habitacion
        }
      );
      console.log(data);

      Elements.getElement(CardElement).clear();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
};

console.log(!stripe || loading);

  const openModal = (room, ) => {
    setIsModalOpen(true);
    setSelectedRoom(room);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);

  }

  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
    calculateNumberOfNights(date, departureDate);
  }

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    calculateNumberOfNights(arrivalDate, date);
  }

  const calculateNumberOfNights = (arrival, departure) => {
    if (arrival && departure) {
      const nights = differenceInDays(departure, arrival);
      setNumberOfNights(nights);
    }
  }


    return(
    
        <div className={styles.container}>
            <div className={styles.title}>ROOMS AND RATES</div>     
            <div className={styles.text}>Each of our bright, light-flooded rooms come with everything you could possibly need for a comfortable stay. And yes, 
            comfort isn’t our only objective, we also value good design, sleek contemporary furnishing complemented 
            by the rich tones of nature’s palette as visible from our rooms’ sea-view windows and terraces. </div>
            {habitaciones.length > 0 ? (
                habitaciones.map((habitacion) => (
                <div className={styles.cardContainer} key={habitacion.id}>
                    <img className={styles.image} src={getImageUrl(`${habitacion.imagen}`)} />
                    <div className={styles.cardBanner}>
                    <center>
                        <div className={styles.cardTitle}>{habitacion.tipo_de_habitacion}</div>
                    </center>
                    </div>
                        <div className={styles.containerBtn}>
                        <a className={styles.bookBtn} onClick={() => openModal(habitacion)}>Book Now</a>
                        <div className={styles.textPrecio}>Price: ${habitacion.precio} per night</div>
                        </div>
                </div>
                ))
            ) : (
                <p>No hay datos disponibles</p>
            )}

{isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeBtn} onClick={closeModal}>&times;</span>
            <p>Room: {selectedRoom.tipo_de_habitacion}</p>
            <p>User Name: {usuario && usuario[0] ? usuario[0].nombre : 'Nombre no disponible'}</p>
            <p>Price: ${selectedRoom.precio} per night</p>
            <div>
              <p>Arrival Date:</p>
              <DatePicker selected={arrivalDate} onChange={handleArrivalDateChange} />
            </div>
            <div>
              <p>Departure Date:</p>
              <DatePicker selected={departureDate} onChange={handleDepartureDateChange} />
            </div>
            <p>Number of Nights: {numberOfNights}</p>
            <Elements stripe={stripePromise}>
              <div className={styles.paymentSection}>
                <p>Total Payment: ${selectedRoom.precio * numberOfNights}</p>
                <CardElement options={{ style: { base: { fontSize: '16px' } }}} />
                <button onClick={handlePayment} disabled={isPaymentProcessing} className={styles.paymentBtn}>
                  {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </Elements>
          </div>
        </div>
      )}

         </div>  
    
    );

}