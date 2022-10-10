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
