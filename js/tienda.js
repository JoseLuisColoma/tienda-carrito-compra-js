let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
let nuevoArrayArticulos = [...listaArticulos]; 
let numeroAleatorio = parseInt(Math.random()*(1000-1) + 1);
let numeroAleatorio2 = parseInt(Math.random()*(1000-1) + 1);
let numeroAleatorio3 = parseInt(Math.random()*(1000-1) + 1);
let tbody= document.querySelector('.tbody');
let orden = '';
let sumar = 'sumar';
let restar = 'restar';
let irACarrito = document.getElementById("irACarrito");
let ventanaDialogoCarrito = document.getElementById("miDialogo");
let id=202200500;

let carrito = new Carrito(id);

function creaListaCriterios() {
	let seleccion = document.getElementById("criteriosOrdenacion");
	criterios.forEach(e => {
		let opcion = document.createElement("option");
		let texto = document.createTextNode(e);
		opcion.value = e;
		opcion.appendChild(texto);
		seleccion.appendChild(opcion);
	});

	seleccion.addEventListener("change",function(){pintaArticulos(seleccion.value)});
}

function pintaArticulos(orden) {
	if(orden == criterios[0]){
		vaciaArticulosDOM();
		listaArticulos = [...nuevoArrayArticulos];
		creaArticulosDOM();
	} else if(orden == criterios[1]){
			vaciaArticulosDOM();
			listaArticulos.sort((a,b) => a.precio-b.precio);
			creaArticulosDOM();
	} else if(orden == criterios[2]){
			vaciaArticulosDOM()
			listaArticulos.sort((a,b) => b.precio-a.precio);
			creaArticulosDOM();
	}
}

function vaciaArticulosDOM() {
	let articulosDOM = document.getElementById("contenedor");
	articulosDOM.innerHTML="";
}

function creaArticulosDOM() {
	let euro = ",00€";
	let zonaArticulos = document.getElementById("contenedor");
	let texto="";
	listaArticulos.forEach(articulo => {
		texto+=`
			<div class='col'>
				<div class='card cardExtra'>
					<img src='./assets/img/${articulo.codigo}.jpg' class='card-img-top'>
					<div class='card-body'>
						<h5 class='card-title'>${articulo.nombre}</h5>
						<p class='card-text card-descripction'>${articulo.descripcion}</p>
						<p class='card-text card-precio'><b>${articulo.precio}${euro}</b></p>
					</div>
					<button id="${articulo.codigo}" class="btn-success" onclick='ponArticuloEnCarrito(${JSON.stringify(articulo)})'>Comprar</button>
				</div>
			</div>`
			zonaArticulos.innerHTML=texto;
		});
}


function ponArticuloEnCarrito(articulo){
	carrito.anyadeArticulo(articulo);
	console.log("artículo creado correctamente");
}


function borraArticuloEnCarrito(codigoArticulo){
	carrito.borraArticulo(codigoArticulo);
	console.log("artículo borrado correctamente");
}


function verCarro(){
	if(carrito.articulos == 0){
		alert("El carrito está vacío");
	}else{
		carrito.verCarrito();
		ventanaDialogoCarrito.showModal();
	}
}

function efectuaPedido(){
	alert("Su pedido se ha realizado correctamente.\nMuchas gracias por tu compra.\n\n(el pedido se ha enviado al servidor)");
	let ventanaDialogoCarrito = document.getElementById("miDialogo");
	ventanaDialogoCarrito.close();
	console.log("OBJETO CARRITO ENVIADO AL SERVIDOR:");
	console.log(JSON.stringify(carrito));
	id++;
	carrito= new Carrito(id);

}


function pedidoRealizado(){
	let botonHacerPedido = document.getElementById('btnEfectuaPedido');
	botonHacerPedido.addEventListener('click', () => efectuaPedido());
}


function esAdministrador(){
	document.getElementById('btnAdministrador').onclick = function(){
		let isAdministrador = confirm('¡Hola!\nEsta zona es SOLO para administradores.\nSe te exigirá una constraseña a continuación.\n\n¿Deseas continuar?');;
		if(isAdministrador){
		alert("Contraseña ...  OK\n\nBienvenido, Administrador.\n\nNota: Recuerda que debes estar conectado al servidor. \nTe aconsejamos utilizar json-server\n($ json-server --watch datos.json)");
		}else{
		 alert("No tienes acceso como Administrador");
		}
	}
}


window.onload=()=>{
	creaListaCriterios();

	if (irACarrito){
		irACarrito.addEventListener('click', () => verCarro());
	}
	creaArticulosDOM(criterios[0]);
	actualizaReloj();
	pedidoRealizado();
	esAdministrador();
}

