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
      const data = await this.db.find({});
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

export default ContenedorMongo;
