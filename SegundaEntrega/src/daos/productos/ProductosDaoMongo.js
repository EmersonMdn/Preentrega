import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";

class DAOProductos extends ContenedorMongo {
  constructor() {
    super("productos", {
      nombre: {
        type: String,
        required: true,
      },
      descripcion: {
        type: String,
      },
      precio: {
        type: Number,
        required: true,
        min: 50,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        min: 1,
      },
    });
  }
}
export default DAOProductos;
