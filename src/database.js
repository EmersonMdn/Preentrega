const fs = require("fs");

class Product {
  constructor(file) {
    this.file = file;
  }

  //editar un producto
  async editProduct(newObj, id) {
    const data = await this.getAllProducts();
    const index = data.findIndex((product) => product.id == id);

    data[index] = newObj;

    const dataString = JSON.stringify(data);

    fs.promises.writeFile(`${this.file}/products.json`, dataString);
    console.log(`Cambiado: ${data[index]}`);
  }

  //crear producto
  async newProduct(objProduct) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const id = products.length + 1;
    const timestamp = new Date().toLocaleString();

    objProduct.id = id;
    objProduct.timestamp = timestamp;

    products.push(objProduct);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(
      `${this.file}/products.json`,
      productsString,
      "utf-8"
    );
    return products;
  }

  //obtener productos
  async getAllProducts() {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  //obtener productos por ID
  async getProductsById(id) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const findProduct = products.find((item) => item.id == id);

    if (findProduct) {
      return findProduct;
    } else {
      throw new Error("Product not found");
    }
  }
}

module.exports = Product;
