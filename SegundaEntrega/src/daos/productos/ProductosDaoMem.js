import { ContenedorProductosMem } from "../../contenedores/contenedorMemo.js";

const productos = [];

class DAOProductosMem extends ContenedorProductosMem {
  constructor() {
    super(productos);
  }
}

export  {DAOProductosMem, productos};
