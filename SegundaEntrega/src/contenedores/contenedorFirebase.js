import admin from "firebase-admin";
import FirebaseConfig from "../utils/config.js";

admin.initializeApp({
  credential: admin.credential.cert(FirebaseConfig.firebase),
  databaseURL: "https://lumos-bf45d.firebaseio.com",
});
const dataBase = admin.firestore();

class ContenedorProductos {
  constructor(coleccion) {
    this.db = dataBase.collection(coleccion);
  }

  async findAll() {
    const snapShot = await this.db.get();
    const data = [];
    snapShot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    console.log(data);
    return data;
  }

  async findById(id) {
    const product = await this.db.doc(id).get();
    return product.data();
  }

  async save(nuevoElemento) {
    try {
      const creado = await this.db.add(nuevoElemento);
      return creado;
    } catch (e) {
      console.error(e);
    }
  }

  async updateOne(nuevoElemento) {
    try {
      console.log(nuevoElemento);
      const { nombre, descripcion, thumbnail, precio, stock } =
        nuevoElemento;
      await this.db
        .doc(nuevoElemento._id)
        .update({ nombre, descripcion, thumbnail, precio, stock });
    } catch (e) {
      console.error(e);
    }
  }
  async deleteOne(id) {
    try {
      await this.db.doc(id).delete();
    } catch (e) {
      console.error(e);
    }
  }
}

class ContenedorCarrito {
  constructor(coleccion) {
    this.db = dataBase.collection(coleccion);
  }
}

export { ContenedorProductos, ContenedorCarrito };
