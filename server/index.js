const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"hotel"
});

//-----------------------------------------------------------USUARIOS--------------------------------------------------------------//

app.post("/createUser",(req,res)=>{
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido_p = req.body.apellido_p;
    const apellido_m = req.body.apellido_m;

    db.query('INSERT INTO usuarios(email,contrasena,nombre,apellido_p,apellido_m) VALUES(?,?,?,?,?)',[email,contrasena,nombre,apellido_p,apellido_m],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/getUsers",(req,res)=>{
    db.query('SELECT * FROM usuarios',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/getUser/:id",(req,res)=>{
    const id_usuario = req.params.id_usuario;
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?',id_usuario,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/updateUser",(req,res)=>{
    const id_usuario = req.body.id_usuario;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const apellido_p = req.body.apellido_p;
    const apellido_m = req.body.apellido_m;

    db.query('UPDATE usuarios SET email=?,contrasena=?,nombre=?,apellido_p=?,apellido_m=? WHERE id_usuario=?',[email,contrasena,nombre,apellido_p,apellido_m,id_usuario],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/deleteUser/:id",(req,res)=>{
    const id_usuario = req.params.id_usuario;

    db.query('DELETE FROM usuarios WHERE id_usuario=?',id_usuario,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});



//-----------------------------------------------------------HABITACIONES--------------------------------------------------------------//

app.post("/createRoom",(req,res)=>{
    const tipo_de_habitacion = req.body.tipo_de_habitacion;
    const estado = req.body.estado;
    const precio = req.body.precio;

    db.query('INSERT INTO habitaciones(tipo_de_habitacion,estado,precio) VALUES(?,?,?)',[tipo_de_habitacion,estado,precio],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/getRooms",(req,res)=>{
    db.query('SELECT * FROM habitaciones',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/updateRoom",(req,res)=>{
    const id_habitacion = req.body.id_habitacion;
    const tipo_de_habitacion = req.body.tipo_de_habitacion;
    const estado = req.body.estado;
    const precio = req.body.precio;

    db.query('UPDATE habitaciones SET tipo_de_habitacion=?,estado=?,precio=? WHERE id_habitacion=?',[tipo_de_habitacion,estado,precio,id_habitacion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/deleteRoom/:id",(req,res)=>{
    const id_habitacion = req.params.id_habitacion;

    db.query('DELETE FROM habitaciones WHERE id_habitacion=?',id_habitacion,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});



//-----------------------------------------------------------RESERVACIONES--------------------------------------------------------------//

app.post("/createReservation",(req,res)=>{
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const numero_huespedes = req.body.numero_huespedes;
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;

    db.query('INSERT INTO reservaciones(fecha_llegada,fecha_salida,numero_huespedes,id_usuario,id_habitacion) VALUES(?,?,?,?,?)',[fecha_llegada,fecha_salida,numero_huespedes,id_usuario,id_habitacion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/getReservations",(req,res)=>{
    db.query('SELECT * FROM reservaciones',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/updateReservation",(req,res)=>{
    const id_reservacion = req.body.id_reservacion;
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const numero_huespedes = req.body.numero_huespedes;
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;


    db.query('UPDATE reservaciones SET fecha_llegada=?,fecha_salida=?,numero_huespedes=?,id_usuario=?,id_habitacion=? WHERE id_reservacion=?',[fecha_llegada,fecha_salida,numero_huespedes,id_usuario,id_habitacion,id_reservacion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.delete("/deleteReservation/:id",(req,res)=>{
    const id_reservacion = req.params.id_reservacion;

    db.query('DELETE FROM reservaciones WHERE id_reservacion=?',id_reservacion,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})