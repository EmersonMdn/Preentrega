import { ContenedorProductos } from "../../contenedores/contenedorFirebase.js";

class DAOProductosFirebase extends ContenedorProductos {
  constructor() {
    super("producto");
  }
}

export default DAOProductosFirebase;
