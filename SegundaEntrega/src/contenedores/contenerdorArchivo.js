import fs from "fs";

//* CONTENEDOR EN ARCHIVO ( PRODUCTOS )

class ContainerProducts {
  constructor(file) {
    this.file = file;
  }

  //? obtener productos
  async findAll() {
    const data = await fs.promises.readFile(this.file, "utf-8");
    return JSON.parse(data);
  }
  //? obtener productos por ID
  async findById(id) {
    const data = await fs.promises.readFile(this.file, "utf-8");
    const products = JSON.parse(data);
    const findProduct = products.find((item) => item.id == id);

    if (findProduct) {
      return findProduct;
    } else {
      throw new Error("Product not found");
    }
  }

  //? Elimina productos por ID
  async deleteOne(id) {
    const data = await this.getAllProducts();
    const newData = data.filter((product) => product.id != id);

    const newDataString = JSON.stringify(newData);

    await fs.promises.writeFile(this.file, newDataString);
    return "Productos eliminado";
  }

  //? crear producto
  async save(objProduct) {
    const data = await fs.promises.readFile(this.file, "utf-8");
    const products = JSON.parse(data);

    objProduct.id = products.length + 1;
    objProduct.timestamp = new Date().toLocaleString();

    products.push(objProduct);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(this.file, productsString, "utf-8");
    return objProduct.id;
  }

  //? editar un producto
  async updateOne(newObj, id) {
    const data = await this.getAllProducts();
    const index = data.findIndex((product) => product.id == id);

    data[index].nombre = newObj.nombre ? newObj.nombre : data[index].nombre;
    data[index].descripcion = newObj.descripcion
      ? newObj.descripcion
      : data[index].descripcion;
    data[index].thumbnail = newObj.thumbnail
      ? newObj.thumbnail
      : data[index].thumbnail;
    data[index].codigo = newObj.codigo ? newObj.codigo : data[index].codigo;
    data[index].precio = newObj.precio ? newObj.precio : data[index].precioñ;
    data[index].stock = newObj.stock ? newObj.stock : data[index].stock;

    const dataString = JSON.stringify(data);

    await fs.promises.writeFile(this.file, dataString);
    console.log(`Cambiado: ${data[index]}`);
  }
}

class ContainerCart {
  constructor(file) {
    this.file = file;
  }

  async getCart() {
    const data = await fs.promises.readFile(this.file, "utf-8");
    return JSON.parse(data);
  }

  //? crear  nuevo Carro

  async newCart() {
    const data = await this.getCart();
    const newCart = {};
    newCart.id = data.length + 1;
    newCart.timestamp = new Date().toLocaleString();
    newCart.productos = [];
    data.push(newCart);
    const newCartString = JSON.stringify(newCart);
    await fs.promises.writeFile(this.file, newCartString);
    return newCart;
  }

  //? Eliminar un carrito

  async deleteCart(id) {
    const data = await this.getCart();
    const newData = data.filter((cart) => cart.id != id);
    const newDataString = JSON.stringify(newData);

    //! En caso que haya un ID superior al tamaño del array devuelve un error

    if (id > data.length) {
      throw new Error("El id del producto no existe");
    } else {
      fs.promises.writeFile(this.file, newDataString);
      return newData;
    }
  }
  //? Agregar producto por un id del producto

  async addProduct(cartId, productoId) {
    const data = await this.getCart();
    const cartIndex = data.findIndex((product) => product.id == cartId);

    const dataProduct = await fs.promises.readFile(this.file, "utf-8");
    const allProducts = JSON.parse(dataProduct);

    const productFound = allProducts.find((item) => item.id == productoId);

    data[cartIndex].productos.push(productFound);

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(this.file, dataString);
    return data;
  }

  //? Eliminar producto de carrito

  async deleteProduct(cartId, productId) {
    const cartData = await this.getCart();
    const cartIndex = cartData.findIndex((cart) => cart.id == cartId);

    cartData[cartIndex] = cartData[cartIndex].product.filter(
      (prod) => prod.id != productId
    );

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(this.file, dataString);

    return data;
  }
}

export { ContainerProducts, ContainerCart };
