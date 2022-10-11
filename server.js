const express = require("express");
const app = express();
const productsRouter = require("./src/products");
const cartRouter = require("./src/cart");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

app.listen(8080, () => {
  console.log("listening on port 8080");
});


/*
  Te invito a que te animes a modularizar las funciones que tenes en los archivos router (productsRouter y cartRouter).
  Tendrias que crear una carpeta dentro de src, que se llamen: 
  controller, routes y middleware(asi te empezas a organizar, porque empieza a crecer el proyecto)

  Dentro de la carpeta controller vas a tener un archivo '.controller.js' para cada router.
  Es decir, vas a tener cart.controller.js y product.controller.js

  dentro de cada archivo vas a declarar las funciones que tenes en los respectivos router
  Por ejemplo en carrito tenes asi:

router.post("/", async (req, res) => {
  const data = await DB.newCart();
  console.log(`Nuevo carrito: ${JSON.stringify(data)}`);
  res.send(`Carrito creado con id: ${data.id}`);
});

  ahora deberias organizarlo de la siguiente manera
  En el archivo cart.controller.js vas a tener la funcion (req, res)=>{}

  const createCart= async (req, res) => {
    const data = await DB.newCart();
    console.log(`Nuevo carrito: ${JSON.stringify(data)}`);
    res.send(`Carrito creado con id: ${data.id}`);
  }
  no olvides exportarla

  Y en el archivo cart.js (podrias renombrarlo a cart.routes.js) te queda:
  router.post("/", createCart)

  Vas a tener que prestar mucha atencion a las importaciones y exportaciones.
  La idea es modularizar lo mejor posible para cuando empiece a crecer el proyecto ya tenerlo adaptado.

  Quedaria pendiente el tema del middleware para validar roles. Si te puedo ayudar en algo no dudes en consultar!
  
  Espero haber sido claro y de ayuda, de todas formas ya sabes, cualquier duda, que estoy a disposicion! Saludos!

*/