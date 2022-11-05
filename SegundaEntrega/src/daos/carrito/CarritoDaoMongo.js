// import { ContenedorCarritoMongo } from "../../contenedores/contenedorMongoDb.js";
import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";
import productoSchema from "../../models/producoSchema.js";

/**
 aca deberias extender de ContenedorMongo
 */
// class CarritoDaoMongo extends ContenedorCarritoMongo {
class CarritoDaoMongo extends ContenedorMongo {
  constructor() {
    super("carrito", {
      // productos: { type: [], default: [] }, => Perdon no entendi esta linea
      // aca podemos reutilizar el schema de productos
      productos: [ productoSchema]
    });
  }
  // agregamos los metodos propios del carrito
    // async addProductToCart(cart_id, product){} 
    // async deleteProductFromCart(cart_id, product){}

}
export default CarritoDaoMongo;
