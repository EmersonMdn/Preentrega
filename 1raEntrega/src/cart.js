const express = require("express");
const db = require("./dbcart");
const DB = new db("data");

const { Router } = express;
const router = Router();

router.get("/", async (req, res) => {
  const data = await DB.getCart();
  res.send(data);
});

router.post("/", async (req, res) => {
  const data = await DB.newCart();
  console.log(`Nuevo carrito: ${JSON.stringify(data)}`);
  res.redirect("/");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const emptyCart = await DB.deleteCart(id);
    res.send({ Eliminado: true, new_array: emptyCart });
  } catch (e) {
    res.status(404).send({ Message: e.message });
  }
});

router.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await DB.addProduct(id);
    res.send({ Agreado: true, new_array: data });
  } catch (e) {
    res.status(404).send({ Message: e.message });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params;
  const data = await DB.deleteProduct(id, id_prod);
  res.send({ Agreado: true, new_array: data });
});

module.exports = router;
