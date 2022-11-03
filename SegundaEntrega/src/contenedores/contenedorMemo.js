class ContenedorProductosMem {
  constructor(database) {
    this.db = database;
  }

  async save(newElement) {
    await this.db.push(newElement);
    console.log("Producto guardado");
  }
  async findAll() {
    console.log("Lista de productos", this.db);
    return this.db;
  }
  async findById(id) {
    const findProduct = await this.db.find((el) => el.id == id);
    console.log(findProduct);
    return findProduct;
  }
  async updateOne(nuevoElemento) {
    const findIndex = await this.db.findIndex(
      (el) => el.id == nuevoElemento.id
    );
    this.db[findIndex] = nuevoElemento;
  }
  async deleteOne(id) {
    const findIndex = await this.db.findIndex((el) => el.id == id);
    this.db.splice(findIndex, 1);
    console.log(`Elemento en la posicion ${findIndex} eliminado...`);
  }
}
class ContenedorCarritoMem {
  constructor(database, productos) {
    this.carrito = database;
    this.productos = productos;
  }

  async getCart() {
    console.log(this.carrito);
    return this.carrito;
  }
  async newCart() {
    const data = await this.getCart();
    const newCart = {};
    newCart.id = data.length + 1;
    newCart.timestamp = new Date().toLocaleString();
    newCart.productos = [];
    this.carrito.push(newCart);
    return newCart.id;
  }
  async deleteCart(id) {
    this.carrito.filter((cart) => cart.id != id);
  }

  async addProduct(cartId, productoId) {
    const cartIndex = this.carrito.findIndex((cart) => cart.id == cartId);
    const findProduct = this.productos.find(
      (product) => product.id == productoId
    );
    this.carrito[cartIndex].productos.push(findProduct);
  }

  async deleteProduct(cartId, productoId) {
    const cartIndex = this.carrito.findIndex((cart) => cart.id == cartId);
    const findProduct = this.productos.filter(
      (product) => product.id != productoId
    );
    this.carrito[cartIndex].productos.push(findProduct);
  }
}

export { ContenedorProductosMem, ContenedorCarritoMem };
