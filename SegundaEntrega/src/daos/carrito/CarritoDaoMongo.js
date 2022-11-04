import { ContenedorCarritoMongo } from "../../contenedores/contenedorMongoDb.js";

class CarritoDaoMongo extends ContenedorCarritoMongo {
  constructor() {
    super("carritos", {
      productos: { type: [], default: [] },
    });
  }
}
export default CarritoDaoMongo;
