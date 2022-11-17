function mostrarArticulos() {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/articulos/");
    xhr.responseType = "json";
    xhr.send();
    let cont = document.getElementById("contenedor");

    xhr.onload = function () {
        let responseObj = xhr.response;
        let texto = `<table id='carrito'>
				<tr>
                    <th class="text-center">Código</th>
                    <th class="text-center">Imagen</th>
				    <th class="text-center">Nombre</th>
				    <th class="text-center">Descripcion</th>
				    <th class="text-center">Precio</th>
				    <th></th>
				</tr>	`;

        responseObj.forEach(e => {
            texto += `<tr>
            <th class="text-center" style="padding:25px">${e.codigo}</th>&nbsp;
			<th class="text-center" style="padding:25px" ><img src='./../assets/img/${e.codigo}.jpg' width="50" height="50" alt="imagen no disponible"></th>&nbsp;
			<th class="text-center" style="padding:25px">${e.nombre}</th>&nbsp;
			<th class="text-center" style="padding:25px">${e.descripcion}</th>&nbsp;
			<th class="text-center" style="padding:25px">${e.precio}€</th>&nbsp;
			<th class="text-center">
                <button id="${e.id}" class="btn btn-primary">Modificar</button>&nbsp;
			    <button id="${e.id}borrar" class="btn btn-danger">Borrar</button>&nbsp;&nbsp;&nbsp;
			</tr>`;
        });
        cont.innerHTML = texto;
    };
}


function limpiarVentanaDialogo() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
}

function crearNuevoArticulo() {

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/articulos/");

    
    let miId = document.getElementById("codigo").value;
    let miNombre = document.getElementById("nombre").value;
    let miDescripcion = document.getElementById("descripcion").value;
    let miPrecio = document.getElementById("precio").value;

    if (miId === "" || miNombre === "" || miDescripcion === "" || miPrecio === null) {

        alert("Rellena por favor los campos para introducir un artículo");

    } else {

        let miPost = {
            id: miId,
            nombre: miNombre,
            descripcion: miDescripcion,
            precio: parseInt(miPrecio),
        };

        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(JSON.stringify(miPost));

        xhr.onload = function () {
            if (xhr.status == 201) {
                console.log(xhr.response);
            } else {
                console.log("Error " + xhr.status + " " + xhr.statusText);
            }
        };
        limpiarVentanaDialogo()

    }

    cerrarVentanaDialogo();
}



function modificarProducto() {
    let xhr = new XMLHttpRequest();
    let miId = document.getElementById("codigo").value;
    xhr.open("PUT", "http://localhost:3000/articulos/" + miId);

    let miNombre = document.getElementById("nombre").value;
    let miDescripcion = document.getElementById("descripcion").value;
    let miPrecio = document.getElementById("precio").value;
    let miPost = {
        id: miId,
        nombre: miNombre,
        descripcion: miDescripcion,
        precio: miPrecio,
    };

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify(miPost));

    xhr.onload = function () {
        if (xhr.status == 201) {
            console.log(xhr.response);
        } else {
            console.log("Error " + xhr.status + " " + xhr.statusText);
        }
    };
}



function mostrarVentanaDialogo() {
    let ventanaDialogo = document.getElementById("abrirDialog");
    ventanaDialogo.showModal();
}


function cerrarVentanaDialogo() {
    let ventanaDialogo = document.getElementById("abrirDialog");
    ventanaDialogo.close();
}


window.onload = () => {
    mostrarArticulos();
    limpiarVentanaDialogo()
};
