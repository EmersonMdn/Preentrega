import { ContainerCart } from "../../contenedores/contenerdorArchivo.js";

class DAOCarritoArchivo extends ContainerCart {
  constructor() {
    super("./SegundaEntrega/public/data/cart.json");
  }
}

export default DAOCarritoArchivo;
