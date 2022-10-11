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
    // const id = data.length + 1;
    // const timestamp = new Date().toLocaleString();
// se puede hacer de manera literal. por ej:
const newCart= {}
  newCart.id = data.length + 1;
  newCart.timestamp = new Date().toLocaleString();
  
// Faltaria agregar el array donde se guardan los productos

  newCart.productos= [];

    // data = [...data, { id: id, timestamp: timestamp }];
    data.push(newCart)
    const newCartString = JSON.stringify(data);
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
    // Se podria agregar una verificacion para saber si el prod fue eliminado.
    // si envio dos veces el mismo id, podria recibir un msj, 
    // "el id ingresado no se encuentra o ya fue eliminado"

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
    // faltaria recibir el id del producto que queremos agregar,
    //  te recomiendo darle nombres descriptimos a las variables y parametros, por ej a los ids, identificarlos
    //  si es de producto -> productoId
    //  si es de carrito -> cartId
    const data = await this.getCart();
    const index = data.findIndex((product) => product.id == id);
    // aca tenemos el indice del carrito podemos nombrarlo cartIndex para que sea menos confuso

    const dataProduct = await fs.promises.readFile(
      `./public/${this.file}/products.json`,
      "utf-8"
    );
    const product = JSON.parse(dataProduct);
    // aca tenemos todos los productos, podemos nombrarlo allProducts
    // necesitamos el id del producto que queremos agregar. 
    // Para agegarlo al arreglo de prodcutos de nuestro carrito

    const productFilter = product.find((item) => item.id == id);
      // productFilter podria llamarse productFound

      // una vez que tenemos el indice de nuestro carrito, solo deberuiamos ingresar en la propiedad productos
      //  y pushear el producto que queremos agregar.
      // por ej: data[index].productos.push(productFound)
    data[index] = { ...data[index], productos: productFilter || [] };

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(`./public/${this.file}/cart.json`, dataString);
    return data;
  }

  //? Eliminar producto de carrito

  async deleteProduct(id, id_prod) {
    // los id podrian ser cartId y productId
    const data = await this.getCart();
    // aca estamos trabajando en el json de cart, no con product
    const index = data.findIndex((product) => product.id == id);
    // seria const cartIndex = cartData.findIndex(cart=> cart.id == cartId)

    const { productos } = data[index];
    // podemos aplicar el filter directamente sobre cartData[carIndex], 
    // por ej: cartData[carIndex] = cartData[carIndex].product.filter(prod.id != productId)
    // y grabamos cartData

    // o buscando tambien el index del producto y aplicando splice(productIndex, 1)
    // esto se posiciona en productIndex, y elimina un elemento
    const newProducts = productos.filter((el) => el.id != id_prod);

    console.log(newProducts);

    data[index].productos = newProducts;

    const dataString = JSON.stringify(data);
    await fs.promises.writeFile(`./public/${this.file}/cart.json`, dataString);

    return data;
  }
}

module.exports = Cart;
