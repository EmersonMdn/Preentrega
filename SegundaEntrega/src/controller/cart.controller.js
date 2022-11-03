import express from "express";
import daos from "../daos/index.js";

const { Router } = express;
const router = Router();
const { carritoDAO } = await daos();

router.get("/", async (req, res) => {
  console.log("hola");
  const cart = await carritoDAO.getCart();
  res.send(cart);
});
router.get("/:id/", async (req, res) => {
  const { id } = req.params;
  const cart = await carritoDAO.getCart();
  const findCart = cart.find((el) => el.id == id);
  res.send(findCart);
});
router.post("./crear-carro", async (req, res) => {
  await carritoDAO.newCart();
  res.send("Carrito creado");
});

router.delete("./:id", async (req, res) => {
  const id = req.params.id;
  carritoDAO.deleteCart(id);
  res.send("Carro eliminado");
});

router.post("./:cartid-:productid", async (req, res) => {
  const { cartId, productId } = req.params;
  carritoDAO.addProduct(cartId, productId);
  res.send("Producto agregado");
});

router.delete("./:cartid-:productid", async (req, res) => {
  const { cartId, productId } = req.params;
  carritoDAO.deleteProduct(cartId, productId);
  res.send("Producto eliminado");
});
export default router;
