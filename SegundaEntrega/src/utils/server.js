import productsRouter from "../controller/product.controller.js";
import cartRouter from "../controller/cart.controller.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", productsRouter);
app.use("/carrito", cartRouter);

app.listen(app.get("port"), async () => {
    mongoose.connect(config.mongodb.url, config.mongodb.options, (e) => {
    if (e) {
      console.log("Can not connect.", e);
      return e;
    }
    console.log("mongoDB connected!");
  });
  console.log(`App listening on port ${app.get("port")}!`)
});
