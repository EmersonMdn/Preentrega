import daos from "../daos/index.js";

(async () => {
  const { productosDAO, carritoDAO } = await daos();

  await productosDAO.save({
    nombre: "Placa de video Gforce 1660",
    descripcion: "Nvidia Video Gforce",
    thumbnail: "https://picsum.photos/300",
    precio: 151000,
    stock: 54,
  });
  console.log(await productosDAO.findAll());
})();

//node ./SegundaEntrega/src/utils/main.js

// console.log(await carritoDAO.findById("636197ac93bee5a9943ec331"));
// await carritoDAO.updateOne({
//   _id: "636197ac93bee5a9943ec331",
//   productos: [
//     {
//       _id: "636194e45a8dc399e94d9f5c",
//       nombre: "Mouse logitech",
//       descripcion: "Una chica mala",
//       precio: 1999,
//       thumbnail: "https://picsum.photos/300",
//       stock: 14,
//     },
//   ],
// });

// await carritoDAO.save({
//   productos: [
//     {
//       _id: "636194e45a8dc399e94d9f5c",
//       nombre: "Mouse logitech",
//       descripcion: "Una chica mala",
//       precio: 1999,
//       thumbnail: "https://picsum.photos/300",
//       stock: 14,
//     },
//   ],
// });

// await productosDAO.updateOne({
//   _id: "636194e45a8dc399e94d9f5c",
//   nombre: "Mouse logitech",
//   descripcion: "Mouse gamer",
//   precio: 1999,
//   thumbnail: "https://picsum.photos/300",
//   stock: 14,
//   __v: 0,
// });
