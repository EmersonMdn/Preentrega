import { ContenedorCarrito } from "../../contenedores/contenedorFirebase.js";

class DAOCarritoFirebase extends ContenedorCarrito {
  constructor() {
    super("carrito", "producto");
  }
}

export default DAOCarritoFirebase;
