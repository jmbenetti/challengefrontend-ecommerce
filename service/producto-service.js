const listaProductos = () => fetch("http://localhost:3000/productos").then(respuesta => respuesta.json());

const crearProducto = (nombre, precio, categoria, imagen) => {
    return fetch("http://localhost:3000/productos", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({nombre, precio, categoria, imagen, id: uuid.v4()}),

    })
}

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`,
    {
        method: "DELETE",
    })
}

export const productServices = {
    listaProductos,
    crearProducto,
    eliminarProducto,
}