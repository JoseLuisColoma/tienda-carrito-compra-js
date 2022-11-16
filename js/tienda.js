let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
let nuevoArrayArticulos = [...listaArticulos]; 
let numeroAleatorio = parseInt(Math.random()*(1000-1) + 1);
let numeroAleatorio2 = parseInt(Math.random()*(1000-1) + 1);
let tbody= document.querySelector('.tbody');
let orden = '';
let sumar = 'sumar';
let restar = 'restar';

//instanciamos un objeto de la clase carrito y le paso como argumento la referencia del carrito
let carrito = new Carrito(idPedido);

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
	console.log("articulo creado correctamente");
}


function borraArticuloEnCarrito(codigoArticulo){
	carrito.borraArticulo(codigoArticulo);
	console.log("artículo borrado correctamente");
}


function verCarro(){
	carrito.verCarrito();
}

function efectuaPedido(){
	alert("Su pedido se ha realizado correctamente.\nGracias por su compra.");
	let ventanaDialogoCarrito = document.getElementById("miDialogo");
	ventanaDialogoCarrito.close();
	console.log(carrito);
}


window.onload=()=>{
	creaListaCriterios();
	let irACarrito = document.getElementById("irACarrito");
	if (irACarrito){
		irACarrito.addEventListener('click', () => verCarro());
	}
	creaArticulosDOM(criterios[0]);
	actualizaReloj();
}

