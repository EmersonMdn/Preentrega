import { ContenedorCarritoMem } from "../../contenedores/contenedorMemo.js";
import { productos } from "../productos/ProductosDaoMem.js";

const carrito = [];

class DAOCarritoMem extends ContenedorCarritoMem {
  constructor() {
    super(carrito, productos);
  }
}

export default DAOCarritoMem;
