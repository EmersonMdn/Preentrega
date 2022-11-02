import ContenedorMongo from "../../contenedores/contenerMongoDb.js";

class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carritos", {
      productos: { type: [], default: [] },
    });
  }
}
export default CarritoDaoMongo;
