import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.TIPO);

const daos = {
  mongo: async () => {
    const { default: ProductosDaoMongo } = await import(
      "./productos/ProductosDaoMongo.js"
    );
    const { default: CarritoDaoMongo } = await import(
      "./carrito/CarritoDaoMongo.js"
    );

    return {
      productosDAO: new ProductosDaoMongo(),
      carritoDAO: new CarritoDaoMongo(),
    };
  },

  mem: async () => {
    const { default: ProductosDaoMem } = await import(
      "./productos/ProductosDaoMem.js"
    );
    const { default: CarritoDaoMem } = await import(
      "./carrito/CarritoDaoMem.js"
    );
    return {
      productosDAO: new ProductosDaoMem(),
      carritoDAO: new CarritoDaoMem(),
    };
  },
};

export default daos[process.env.TIPO];
