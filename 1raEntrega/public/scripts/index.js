const getItems = async () => {
  try {
    const response = await fetch("/api/productos");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getCart = async () => {
  try {
    const response = await fetch("/api/carrito");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const renderList = (data) => {
  const div = data
    .map(
      (item) => `
  <div id="item-10${item.id}" class="cards">
        <img src=${item.thumbnail} class="card-img-top"/>
        <div class="card-body">
            <h5>${item.nombre}</h5>
            <h6>$${item.precio} ARS</h6>  
            <button type="button" class="btn btn-primary">Actualizar</button>
            <button type="button" class="btn btn-danger">Eliminar</button>
        </div> 
   </div>`
    )
    .join("");

  document.getElementById("list-items").innerHTML = div;
};

const renderCart = (data) => {
  const div = data
    .map(
      (cart) =>
        `
      <div class="cartlist">
          <h5>Carrito: #${cart.id}</h5>
          ${
            cart.productos
              ? `<h6>${cart.productos.nombre} | Hora: ${cart.timestamp}| Precio: $${cart.productos.precio} |</h6>`
              : `<h6>Carrito vacio</h6>`
          }
      </div>
      `
    )
    .join("");
  document.getElementById("list").innerHTML = div;
};

getItems().then((data) => {
  renderList(data);
});

getCart().then((data) => {
  console.log(data);
  renderCart(data);
});
