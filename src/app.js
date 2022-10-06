const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

// app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", './views');
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
  defaultLayout: "main",
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");

const productsRouter = require("./products");
const cartRouter = require("./cart");

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);


app.listen(8080, () => {
  console.log("Listening on port 8080");
});
