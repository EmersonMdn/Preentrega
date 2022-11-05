import ContenedorMongo from "../../contenedores/contenedorMongoDb.js";
import productoSchema from "../../models/producoSchema.js";

class DAOProductos extends ContenedorMongo {
  constructor() {
    // el schema es mejor crearlo aparte
    super("productos", productoSchema)
    // {
    //   nombre: {
    //     type: String,
    //     required: true,
    //   },
    //   descripcion: {
    //     type: String,
    //   },
    //   precio: {
    //     type: Number,
    //     required: true,
    //     min: 50,
    //   },
    //   thumbnail: {
    //     type: String,
    //     required: true,
    //   },
    //   stock: {
    //     type: Number,
    //     min: 1,
    //   },
    // });
  }
}

export default DAOProductos