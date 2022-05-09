import { clientServices } from "../service/producto-service.js";

const formulario = document.querySelector("[data-form]");
formulario.addEventListener("submit", (events) => {
    events.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientServices.crearCliente(nombre, email).then(() => {
        window.location.href = "/screens/registro_completado.html"
    }).catch(err => console.log(err));

})