import { Schema } from "mongoose";
import productoSchema from "./producoSchema";

const carritoSchema = new Schema({
    productos: productoSchema
});

export default carritoSchema