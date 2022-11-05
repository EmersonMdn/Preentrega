import express from "express";
import daos from "../daos/index.js";
// esto iria en una carpeta routes, em controller, solo irian las funciones (req,res)
const { Router } = express;
const router = Router();
const { productosDAO } = await daos();

/*
por ej:

router.get("/", getAllProducts)

en la carpeta controller, en el archivo product.controller.js
tendras las funciones exportadas

export const getAllProducts = async (req, res)=> {
  const data = await productosDAO.findAll();
  res.send(data);

  tambien tendrias que ver las respuestas que se envian, ya que hay que tener en cuenta las respuestas
  de los errores.
});


*/
router.get("/", async function (req, res) {
  const data = await productosDAO.findAll();
  res.send(data);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const data = await productosDAO.findById(id);
  console.log(data);
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
