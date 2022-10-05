const express = require("express");
const app = express();

const { Router } = express;
const router = Router();

let Cart = [];
const admin = true;

router.post("/", async (req, res) => {
  await fs.promises.writeFile("../data/cart.json", []);
});

router.delete("/:id", async (req, res) => {
  if (admin) {
    await fs.promises.writeFile("../data/cart.json", []);
  } else {
    console.log("No cumple con los permisos para hacer eso!");
  }
});

router.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const data = await fs.promises.readFile("../data/cart.json", "utf8");
  const products = JSON.parse(data);
  res.render("main", { layout: "cartView", ...products });
});

router.post("/:id/productos", (req, res) => {});

router.delete("/:id/productos/:id_prod", (req, res) => {});

module.exports = router;
