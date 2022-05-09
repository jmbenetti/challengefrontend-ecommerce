const servidorJSON = "https://heroku-json-jmb.herokuapp.com/productos";
//const servidorJSON = "http://localhost:3000/productos";

const listaProductos = () => fetch(servidorJSON).then(respuesta => respuesta.json());

const crearProducto = (nombre, precio, categoria, imagen) => {
    return fetch(servidorJSON, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({nombre, precio, categoria, imagen, id: uuid.v4()}),

    })
}

const eliminarProducto = (id) => {
    //return fetch(`http://localhost:3000/productos/${id}`,
    return fetch(servidorJSON + id,
    {
        method: "DELETE",
    })
}

export const productServices = {
    listaProductos,
    crearProducto,
    eliminarProducto,
}