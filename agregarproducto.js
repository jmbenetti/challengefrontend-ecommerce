const divImagen = document.querySelector("#imgsubida");
var imgSubida;
var listaArchivos;
var bImagenCargada = false;

// Arrastrar sobre el div
divImagen.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Definir que soltar haga una operación de copia.
  event.dataTransfer.dropEffect = 'copy';
});

// Soltar en el div
divImagen.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  listaArchivos = event.dataTransfer.files;
  
  readImage(listaArchivos[0]);
});

// Convertir la imagen a Data URI
readImage = (file) => {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    imgSubida = event.target.result;
    divImagen.style.backgroundImage = `url(${imgSubida})`;
  });
  reader.readAsDataURL(file);
  bImagenCargada = true;
}

function clickImgsubida()
{
  if(screen.width < 768){clickSubir()};
}

function clickSubir() {
  //Creo un campo input para recibir el archivo
  let input = document.createElement('input');
  input.type = 'file';
  input.accept="image/*";
  //Defino el evento onchange del campo input que acabo de crear
  input.onchange = _ => {
            listaArchivos =   Array.from(input.files);
            console.log(listaArchivos);
            readImage(listaArchivos[0]);
        };
  //Llamo al evento click de mi input recién creado
  input.click();
}

function agregarProducto() {

  var szNombre = document.querySelector("#nombreagregado").value;
  var szPrecio = document.querySelector("#precioagregado").value;
  var szDescripcionagregado = document.querySelector("#descripcionagregado").value;
  var szError = "";

  if(szNombre == "") { szError += "El campo nombre no puede estar en blanco.<br>";}
  if(szNombre.length > 20 ) { szError += "El campo nombre no puede tener más de 20 caraceres.<br>"}
  if(szPrecio == "") { szError += "El campo precio no puede estar en blanco.<br>";}
  if(szDescripcionagregado == "") { szError += "El campo descripción no puede estar en blanco.<br>";}
  if(szDescripcionagregado.length > 150 ) { szError += "El campo descripción no puede tener más de 150 caraceres.<br>"}
  if(!bImagenCargada) { szError += "Debe subir una imagen para el producto.<br>"};

  document.querySelector("#erroragregar").innerHTML = szError;

  if(szError == "")
  {
    alert("Producto cargado");
    document.querySelector("#nombreagregado").value = ""; 
    document.querySelector("#precioagregado").value = ""; 
    document.querySelector("#descripcionagregado").value = "";
    divImagen.style.backgroundImage = "url('./img/arrastre.png')";
  }
}