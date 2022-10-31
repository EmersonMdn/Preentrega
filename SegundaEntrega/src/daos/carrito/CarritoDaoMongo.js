import { ContenedorMongo } from "../../contenedores/contenerArchivo.js";

export class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos");
  }
  async addStock() {}
}
