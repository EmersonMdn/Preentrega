import { ContenedorCarrito } from "../../contenedores/contenedorFirebase.js";

class DAOCarritoFirebase extends ContenedorCarrito {
  constructor() {
    super("carrito");
  }
}

export default DAOCarritoFirebase;
