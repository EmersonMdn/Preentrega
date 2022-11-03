import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      productos: { type: [], default: [] },
    });
  }
}
export default CarritoDaoMongo;
