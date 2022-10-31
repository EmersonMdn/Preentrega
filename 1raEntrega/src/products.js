const express = require("express");
const db = require("./database.js");
const DB = new db("data");
const fs = require("fs");

const { Router } = express;
const router = Router();

router.get("/:id?", async (req, res) => {
  const data = await DB.getAllProducts();
  res.send(data);
});

router.post("/", async (req, res) => {
  const { nombre, descripcion, thumbnail, codigo, precio, stock } = req.body;
  const newData = { nombre, descripcion, thumbnail, codigo, precio, stock };
  await DB.newProduct(newData);
  res.redirect("/");
  res.send(newData);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let { nombre, descripcion, thumbnail, codigo, precio, stock } = req.body;
    const newData = {
      nombre,
      descripcion,
      thumbnail,
      codigo,
      precio,
      stock,
      id,
    };
    await DB.editProduct(newData, id);
    res.send("Cambiado");
  } catch (err) {
    console.log("Producto no encontrado");
    res.status(400).send("Not Found" + err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await DB.removeProduct(id);
  res.send(data);
});

module.exports = router;
