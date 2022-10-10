const console = require("console");
const fs = require("fs");

class Cart {
  constructor(file) {
    this.file = file;
  }

  async getCart() {
    const data = await fs.promises.readFile(
      `./public/${this.file}/cart.json`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  //? crear  nuevo Carro

  async newCart() {
    const data = await this.getCart();
    const id = data.length + 1;
    const timestamp = new Date().toLocaleString();

    const newCart = [...data, { id: id, timestamp: timestamp }];
    const newCartString = JSON.stringify(newCart);
    await fs.promises.writeFile(
      `./public/${this.file}/cart.json`,
      newCartString
    );
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
      fs.promises.writeFile(`./public/${this.file}/cart.json`, newDataString);
      return newData;
    }
  }

  //? Agregar producto por un id del producto

  async addProduct(id) {
    const data = await this.getCart();
    const index = data.findIndex((product) => product.id == id);

    const dataProduct = await fs.promises.readFile(
      `./public/${this.file}/products.json`,
      "utf-8"
    );
    const product = JSON.parse(dataProduct);

    const productFilter = product.find((item) => item.id == id);

    data[index] = { ...data[index], productos: productFilter || [] };

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(`./public/${this.file}/cart.json`, dataString);
    return data;
  }

  //? Eliminar producto de carrito

  async deleteProduct(id, id_prod) {
    const data = await this.getCart();
    const index = data.findIndex((product) => product.id == id);

    const { productos } = data[index];

    const newProducts = productos.filter((el) => el.id != id_prod);

    console.log(newProducts);

    data[index].productos = newProducts;

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(`./public/${this.file}/cart.json`, dataString);

    return data;
  }
}

module.exports = Cart;
