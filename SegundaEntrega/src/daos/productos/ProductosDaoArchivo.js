import { ContainerProducts } from "../../contenedores/contenerdorArchivo.js";

class DAOProductosArchivo extends ContainerProducts {
  constructor() {
    super("./SegundaEntrega/public/data/products.json");
  }
}

export default DAOProductosArchivo;
