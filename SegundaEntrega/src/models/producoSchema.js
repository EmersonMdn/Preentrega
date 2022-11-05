import { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  precio: { type: Number, required: true, min: 50 },
  stock: { type: Number, required: true, min: 1 },
});

export default productoSchema