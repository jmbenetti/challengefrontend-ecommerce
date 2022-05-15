import { productServices } from "../service/producto-service.js";

const urlActual = window.location.search;
const SearchParams = new URLSearchParams(urlActual);
var categoriaElegido = "";
let verTodo = "";
// if(SearchParams.has("vertodo"))
// {
    verTodo = SearchParams.get("vertodo")=="true";
// }

//para buscar por nombre
// let nombreBuscado = "";
// nombreBuscado = SearchParams.get("nombre");
    
let idBuscado = "";
if(SearchParams.has("id")) {
    idBuscado = SearchParams.get("id");
 }

if(idBuscado==""){
    document.querySelector("#productoelegido").style.display = "none";
}
else
{
    // console.log("Buscando por id");
    productServices.listaProductos("/" + idBuscado).then((data)=>{
    
        // data.forEach(({nombre, precio, categoria, imagen, id}) => {
            // console.log("Nombre encontrado" + data.nombre);
        // });
        document.querySelector("#imagenelegido img").src = data.imagen;
        document.querySelector("#imagenelegido img").style.width = "560px";
        document.querySelector("#tituloelegido").innerHTML = data.nombre;
        document.querySelector("#precioelegido").innerHTML = data.precio;
        document.querySelector("#descripcionelegido").innerHTML = data.descripcion;
        categoriaElegido = data.categoria;
        
    
    })
}
// console.log(idBuscado);



//MOSTRAR CATEGORÍA DEL MISMO PRODUCTO CON EL NOMBRE DE PRODUCTOS SIMILARES Y OCULTAR EL RESTO

const listarProducto = (nombre, precio, categoria, imagen, id) => {
    const linea = document.createElement("div");
    linea.className = "itemproducto";
    const contenido = ` <div class="imagenproducto"><img src="${imagen}"></div>
    <div class="tituloproducto">${nombre}</div>
    <div class="precioproducto">\$${precio}</div>
    <div class="linkproducto"><a href="index.html?id=${id}">Ver producto</a></div>`;
    linea.innerHTML = contenido;
    return linea;
}

productServices.listaProductos().then((data) => {
    let maxItems = 6; //Máximo de productos por categoría en vista de categorías

    //Cambio el máximo de productos para tablet
    if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1365px)").matches){
        // console.log("tablet");
        maxItems=4;
    }
    //Y para celular
    if (window.matchMedia("(max-width: 767px)").matches){
        // console.log("celular");
        maxItems=2;
    }

    let productosMostrados = {
        starwars: "0",
        consolas: "0",
        diversos: "0" 
    }
    

    //Si no di la orden de mostrar todos los productos...
    if(!verTodo){
        //busco el div de la categoría de todos los productos buscando el parent del de la lista y lo oculto
        const parentCategoria = document.querySelector(".listatodo").closest(".categoria");
        parentCategoria.style.display="none";
    }
    else{
        //oculto los divs de las otras categorías para mandar todo a la general
        const ocultarCategorias = ["starwars", "consolas", "diversos"];
        ocultarCategorias.forEach((nombreCategoria) => {
                const parentCategoria = document.querySelector(".lista" + nombreCategoria).closest(".categoria");
                parentCategoria.style.display="none";
            })
        //oculto el banner
        document.querySelector("#banner").style.display = "none";
        }

    data.forEach(({nombre, precio, categoria, imagen, id}) => {
        let listaCategoria = "";
        let nuevaLinea = "";
        //console.log(verTodo==true);
        if(verTodo)
        {
            // console.log("ok");
            listaCategoria = document.querySelector(".listatodo");
            //console.log(listaCategoria.closest(".categoria").innerHTML);
            nuevaLinea = listarProducto(nombre, precio, categoria, imagen, id); 
            listaCategoria.appendChild(nuevaLinea);
        }
        else
        {
            listaCategoria = document.querySelector(".lista" + categoria);
            productosMostrados[categoria]++;
            // console.log("Mostrados " + categoria + "=" + productosMostrados[categoria]); 
            if(productosMostrados[categoria]<= maxItems)
            {
                nuevaLinea = listarProducto(nombre, precio, categoria, imagen, id); 
                listaCategoria.appendChild(nuevaLinea);
            }
        }

      
    
});
})
//AGREGAR .catch((error) => alert("Error en la operación: " + error));