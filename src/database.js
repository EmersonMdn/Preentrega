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
// deberiamos dar la opcion de modificar solo algunas propiedades del producto, 
//por ej si solo necesito actualizar el precio
/**
 para eso podes aprovechar que ya tenes el indice del prod y que en newObj, estas recibiendo todas las propiedades, y validar una por una los valores que recibis
 si tiene valor, lo asignas, sino, queda el valor que esta guardado.

 Por ej: 
  data[index].nombre = nombre ? nombre : data[index].nombre ;
  Asi con cada propiedad.
 */
    const dataString = JSON.stringify(data);

    await fs.promises.writeFile(
      `./public/${this.file}/products.json`,
      dataString
    );
    console.log(`Cambiado: ${data[index]}`);
  }

  //crear producto
  async newProduct(objProduct) {
    const data = await fs.promises.readFile(
      `./public/${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
//    const id = products.length + 1; // se puede asignar directamente, para evitar crear una variable demas.
// const timestamp = new Date().toLocaleString();
// objProduct.id = id;
// objProduct.timestamp = timestamp;

    objProduct.id = products.length + 1; 
    objProduct.timestamp = new Date().toLocaleString();

    products.push(objProduct);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(
      `./public/${this.file}/products.json`,
      productsString,
      "utf-8"
    );
    //deberiamos devolver el id del prod agregado -> 
    // return products;
    return objProduct.id
  }

  //obtener productos
  async getAllProducts() {
    const data = await fs.promises.readFile(
      `./public/${this.file}/products.json`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  //obtener productos por ID
  async getProductsById(id) {
    const data = await fs.promises.readFile(
      `./public/${this.file}/products.json`,
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

  //Elimina productos por ID
  async removeProduct(id) {
    const data = await this.getAllProducts();
    const newData = data.filter((product) => product.id != id);
    // faltaria verificar si el producto fue eliminado.
    // podrias comparar si hay diferencia entre el .length de data y el de newData
    const newDataString = JSON.stringify(newData);

    await fs.promises.writeFile(
      `./public/${this.file}/products.json`,
      newDataString
    );
    // responder mensaje de prod eliminado
    return newData;
  }
}

module.exports = Product;
