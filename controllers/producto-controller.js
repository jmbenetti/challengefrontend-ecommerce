// import { productServices } from "../service/producto-service.js";

// const crearNuevaLinea = (nombre, email, id) => {
//     const linea = document.createElement("tr");
//     const contenido = `<td class="td" data-td>${nombre}</td>
//     <td>${email}</td>
//     <td>
//       <ul class="table__button-control">
//         <li>
//           <a
//             href="../screens/editar_cliente.html"
//             class="simple-button simple-button--edit"
//             >Editar</a
//           >
//         </li>
//         <li>
//           <button
//             class="simple-button simple-button--delete"
//             type="button"
//           >
//             Eliminar
//           </button>
//         </li>
//       </ul>
//     </td>`;
//     linea.innerHTML = contenido;
//     const btn = linea.querySelector("button");
//     btn.addEventListener("click", (events) => {
//       clientServices.eliminarCliente(id).then(respuesta => {
//         console.log(respuesta);
//       }).catch(err => alert("Hubo un error"));
//     });
//     return linea;
// }

// const table = document.querySelector("[data-table]");

console.log("producto-controller");

productServices.listaProductos().then((data) => {
    data.forEach(({nombre, precio, categoria, imagen, id}) => {
      console.log("nombre:" + nombre);
      console.log("precio:" + precio);
      console.log("categoria:" + categoria);
      console.log("imagen:" + imagen);
      console.log("id:" + id);
});
}).catch((error) => alert("Error en la operación"));