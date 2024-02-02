import React, { useState } from "react";
import styles from "./sign-up.module.css";
import Axios from "axios";
import { getImageUrl } from "../../utils";

export const Sign_up = () => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido_p, setApellido_p] = useState("");
    const [apellido_m, setApellido_m] = useState("");
    const [completed, setCompleted] = useState(0);
    
    const add = () => {
        Axios.post("http://localhost:3001/createUser", {
          email: email,
          contrasena: contrasena,
          nombre: nombre,
          apellido_p: apellido_p,
          apellido_m: apellido_m
        })
          .then(() => {
            setCompleted(1)
          })
          .catch((error) => {
            alert("Error" + (error));
            setCompleted(2)
          });
      };

    
    return(
       <>
       <div className={styles.navbar}>
       <img  src={getImageUrl("navbar/logo.png")}/>
       </div>
            <div className={styles.container}> 
                <div className={styles.content}>
                    <div className={styles.welcome}>SIGN UP</div>
                </div>
            </div>
            <div className={styles.container2}>
      
            <form >
            <center>
            {completed == 1 ? (
              <div class="alert alert-dismissible alert-success">
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
              <strong>Well done</strong> Your user has been registered <a href="/login" class="alert-link">you can login now</a>.
            </div>
            ) : completed == 2 ? (
              <div className="alert alert-dismissible alert-danger">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                ></button>
                <strong>Oops!</strong> Something went wrong.
              </div>
            ) : null}
            </center>
                    <label for="email" class="form-label" className={styles.description}>Email:</label><br></br>
                    <input type="email" class="form-control" className={styles.entradas} id="email" placeholder="Enter your email" name="email"
                     value={email} onChange={(event) => setEmail(event.target.value)}></input><br></br>

                    <label for="password" class="form-label" className={styles.description}>Password: </label><br></br>
                    <input type="password" class="form-control" className={styles.entradas} id="password" placeholder="Enter your password" name="password"
                     value={contrasena} onChange={(event) => setContrasena(event.target.value)}></input><br></br> 

                    <label for="name" class="form-label" className={styles.description}>First Name:</label><br></br>
                    <input type="text" class="form-control" className={styles.entradas} id="name" placeholder="Enter your name" name="name"
                     value={nombre} onChange={(event) => setNombre(event.target.value)}></input><br></br>

                    <label for="apellido_p" class="form-label" className={styles.description}>Middle Name: </label><br></br>
                    <input type="text" class="form-control" className={styles.entradas} id="apellido_p" placeholder="Enter your first name" name="apellido_p"
                     value={apellido_p} onChange={(event) => setApellido_p(event.target.value)}></input><br></br>

                    <label for="apellido_m" class="form-label" className={styles.description}>Last Name: </label><br></br>
                    <input type="text" class="form-control" className={styles.entradas} id="apellido_m" placeholder="Enter your first name" name="apellido_m"
                     value={apellido_m} onChange={(event) => setApellido_m(event.target.value)}></input><br></br> 
                    <center>
                    <a className={styles.bookBtn} onClick={add}>SIGN UP</a><br></br>
                    <br></br>
                    <a href="/login">I have an account</a>
                    </center>
            </form>
                  
            </div>
        </>
    );
}