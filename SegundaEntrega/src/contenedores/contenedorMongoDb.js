import mongoose from "mongoose";
import config from "../utils/config.js";

(async () => {
  await mongoose.connect(config.mongodb.url, config.mongodb.options);
})();

class ContenedorMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
  }

  async findAll() {
    try {
      const data = await this.db.find();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findById(id) {
    try {
      const data = await this.db.findOne({ _id: id }, { __v: 0 });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async save(nuevoElemento) {
    try {
      const creado = await this.db.create(nuevoElemento);
      return creado;
    } catch (e) {
      console.error(e);
    }
  }
  async updateOne(elemento) {
    try {
      await this.db.replaceOne({ _id: elemento._id }, elemento);
      return elemento;
    } catch (e) {
      throw new Error(e);
    }
  }
  async deleteOne(id) {
    try {
      await this.db.deleteOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
}

class ContenedorCarritoMongo {
  constructor(coleccion, esquema) {
    this.db = mongoose.model(coleccion, esquema);
    this.productos = mongoose.model("productos", {
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

  async getCart() {
    const data = await this.db.find();
    return data;
  }
  async newCart() {
    try {
      const data = await this.db.find();
      const carrito = {
        id: data.length + 1,
        timestamp: new Date.now(),
        productos: [],
      };
      const creado = await this.db.create(carrito);
      return creado;
    } catch (e) {
      console.error(e);
    }
  }
  async deleteCart(id) {
    try {
      await this.db.deleteOne({ _id: id });
    } catch (e) {
      throw new Error(e);
    }
  }
  async addProduct(cartId, productoId) {
    try {
      let cart = await this.db.findOne({ _id: cartId });
      const producto = await this.productos.findOne({ id: productoId });
      cart.productos = producto;

      await this.db.updateOne({ _id: cartId }, cart);
    } catch (e) {
      throw new Error(e);
    }
  }
  async deleteProduct(cartId, productoId) {
    try {
      let cart = await this.db.findOne({ _id: cartId });
      cart.product.filter((prod) => prod.id != productoId);
      await this.db.updateOne({ _id: cartId }, cart);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export { ContenedorMongo, ContenedorCarritoMongo };
