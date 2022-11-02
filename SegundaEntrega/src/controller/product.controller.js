import express from "express";
import daos from "../daos/index.js";

const { Router } = express;
const router = Router();
const { productosDAO } = await daos();

router.get("/", async function (req, res) {
  const data = await productosDAO.findAll();
  res.send(data);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const data = await productosDAO.findById(id);
  res.send(data);
});

router.post("/", async function (req, res) {
  const { nombre, descripcion, thumbnail, precio, stock } = req.body;
  const newProduct = { nombre, descripcion, thumbnail, precio, stock };
  await productosDAO.save(newProduct);
  res.send({ MSG: "Nuevo Producto publicado", newProduct });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await productosDAO.findById(id);
  await productosDAO.deleteOne(id);
  res.send({ msg: "Eliminado", eliminado: data });
});

router.put("/:id", async (req, res) => {
  const { _id, nombre, descripcion, thumbnail, precio, stock } = req.body;
  await productosDAO.updateOne({
    _id,
    nombre,
    descripcion,
    thumbnail,
    precio,
    stock,
  });
  res.send("update!!!");
});

export default router;
