import express from "express";
import daos from "../daos/index.js";

const { Router } = express;
const router = Router();
const { carritoDAO } = await daos();

router.get("/", async (req, res) => {
  const data = await carritoDAO.findAll();
  res.send(data);
});

export default router;
