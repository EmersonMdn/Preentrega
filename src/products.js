
const express = require("express");

const db = require("./database.js");
const DB = new db("data");
const fs = require("fs");

const { Router } = express;
const router = Router();

let Products = [];

router.get("/", async (req, res) => {
  const data = await DB.getAllProducts();
  Products.push(data);
  res.render("main", { layout: "products", data: data });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await DB.getProductsById(id);
    res.render("main", { layout: "productDetail", ...data });
  } catch (err) {
    res.status(404).render("main", { layout: "error" });
  }
});

router.post("/", async (req, res) => {
  const { nombre, descripcion, thumbnail, codigo, precio, stock } = req.body;
  const newData = { nombre, descripcion, thumbnail, codigo, precio, stock };
  await DB.newProduct(newData);
  res.redirect("/api/productos");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let { nombre, descripcion, thumbnail, codigo, precio, stock } = req.body;
    const newData = { nombre, descripcion, thumbnail, codigo, precio, stock, id };
    await DB.editProduct(newData, id);
    res.send('Cambiado');
  } catch (err) {
    console.log("Producto no encontrado");
    res.status(400).send("Not Found" + err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let data = await DB.getAllProducts();
  const index = data.findIndex((product) => product.id == id);
  data.splice(index, 1);
  await fs.promises.writeFile("../data/products.json", data);
});

module.exports = router;
