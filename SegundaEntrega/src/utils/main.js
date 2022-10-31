import { ContenedorMongo } from "../contenedores/contenerArchivo.js";
(async () => {
  const producto = new ContenedorMongo("productos", {
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

  console.log(await producto.findAll());
})();



//node ./SegundaEntrega/src/utils/main.js