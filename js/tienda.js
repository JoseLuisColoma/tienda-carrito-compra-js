	let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
 	let carrito = [];
	let tbody= document.querySelector('.tbody');

	function creaListaCriterios(){ //creamos listado del select con las diferentes opciones de los criterios de ordenación
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
	let nuevoArrayArticulos = [...listaArticulos]; //matriz copia de la original

	function pintaArticulos(orden){ //pinta artículos en el DOM según criterios de ordenación
		if(orden == criterios[0]){
			vaciaArticulos();
			listaArticulos = [...nuevoArrayArticulos];
			creaArticulos();
		} else if(orden == criterios[1]){
				vaciaArticulos();
				listaArticulos.sort((a,b) => a.precio-b.precio);
				creaArticulos();
		} else if(orden == criterios[2]){
				vaciaArticulos()
				listaArticulos.sort((a,b) => b.precio-a.precio);
				creaArticulos();
		}
	}


	function vaciaArticulos(){ //Vacía los artículos del DOM
		let articulosDOM = document.getElementById("contenedor");
		articulosDOM.innerHTML="";
	}

	function creaArticulos(){
		let euro = "€";
		let zonaArticulos = document.getElementById("contenedor");
		let texto="";
		listaArticulos.forEach(e => {
				texto+=`
				<div class='col'>
				<div class='card cardExtra'>
					<img src='./assets/img/${e.codigo}.jpg' class='card-img-top'>
					<div class='card-body'>
						<h5 class='card-title'>${e.nombre}</h5>
						<p class='card-text card-descripction'>${e.descripcion}</p>
						<b>
							<p class='card-text card-precio'>${e.precio}${euro}</p>
						</b>
					</div>
					<button id="${e.codigo}" class='btn-success'>comprar</button>
				</div>
			</div>`
		});
		zonaArticulos.innerHTML=texto;

		let clickButton = document.getElementsByClassName('btn-success');
		let clickButtonArray = Array.from(clickButton);
		clickButtonArray.forEach(btn => {
			btn.addEventListener("click", ponArticuloEnCarrito);
		})
	}

	function ponArticuloEnCarrito(event, id){
		let button = event.target;
		let articulo = button.closest('.card');
		let nombreArticulo = articulo.querySelector('.card-title').textContent;
		let precioArticulo = articulo.querySelector('.card-precio').textContent;
		let descripcionArticulo = articulo.querySelector('.card-descripction').textContent;
		let imagenArticulo = articulo.querySelector('.card-img-top').src;
		nuevoArticulo = {
			'codigo': id,
			'nombre': nombreArticulo,
			'descripcion': descripcionArticulo,
			'precio': precioArticulo,
			'imagen': imagenArticulo,
			'cantidad': 1
		};
		anyadeArticulo(nuevoArticulo);
	}


 function anyadeArticulo(nuevoArticulo){

	//alert para indicar que se ha añadido un elemento al carrito (de 3 segundos)
	let alert=document.querySelector('.alert');
	setTimeout( function(){ alert.classList.add('hide');
												}, 1000);
    										alert.classList.remove('hide');

	let elementoEntrada = tbody.getElementsByClassName("elemento_Entrada");
	for (i = 0; i <= carrito.length-1; i++){
		if(carrito[i].nombre.trim() === nuevoArticulo.nombre.trim()){ //quitamos espacios a los lados por si acaso
			carrito[i].cantidad++;
			let valorEntrada = elementoEntrada[i];
			valorEntrada.value++;
			carritoTotal();
			return null;
		}
	}
	carrito.push(nuevoArticulo);
	verCarrito();
 }

 function verCarrito(){
	tbody.innerHTML="";
	carrito.map(articulo => {
		let tr = document.createElement("tr");
		tr.classList.add('articuloCarrito');
		let contenido =
		` <th class="articuloCodigo text-center"><b>${articulo.codigo}</b></th>
			<th><img src=${articulo.imagen} width="60px" height="60px" alt="imágenes artículos"></th>
			<th class="nombre">${articulo.nombre}</th>
			<th class="nombre">${articulo.descripcion}</th>
			<th class="table_precio card-precio"><p>${articulo.precio}</p></th>
			<th class="table_cantidad"><input  min="1" size="1" value=${articulo.cantidad} class="elemento_Entrada"><th>
			<th>
				<a id="sumar" class="restar btn btn-primary"><b>-</b></a>
				<a id="restar" class="sumar btn btn-primary"><b>+</b></a>
				<a class="delete btn btn-danger"><b>Eliminar</b></a>
			</th>
		`
		tr.innerHTML = contenido;
		tbody.append(tr);

		tr.querySelector(".delete").addEventListener('click', borrarArticulo);

		tr.querySelector(".elemento_Entrada").addEventListener('click', sumaCantidad);
		tr.querySelector(".elemento_Entrada").addEventListener('click', restaCantidad);
	});
	carritoTotal();
}

function carritoTotal(){
	let total=0;
	let precioTotalCarrito = document.querySelector(".precioTotal");
	carrito.forEach(articulo => {
		let precioArticulo = parseFloat(articulo.precio.replace("€",""));
		total= total + (precioArticulo * articulo.cantidad);
	});
	precioTotalCarrito.innerHTML = `${total},00€`;
	addLocalStorage();
}

function borrarArticulo(event){
		const botonBorrar = event.target;
		const tr = botonBorrar.closest(".articuloCarrito")
		const nombre = tr.querySelector('.nombre').textContent;
		for(let i=0; i<carrito.length ; i++){
			if(carrito[i].nombre.trim() === nombre.trim()){
				carrito.splice(i, 1);
			}
		}
	let alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 750)
    alert.classList.remove('remove')

  tr.remove()
  carritoTotal()
}

	function verCarro(){

	}

	function efectuaPedido(){

	}

	/*
	let sumaUnidades = document.querySelector('.sumar');
	let restaUnidades = document.querySelector('.restar');

	sumaUnidades.addEventListener("click", sumaCantidad);
	restaUnidades.addEventListener("click", restaCantidad);
*/

	function sumaCantidad(event){
		let sumaArticulo = event.target;
		let tr = sumaArticulo.closest('articuloCarrito');
		let nombre = tr.querySelector(".nombre").textContent;

		carrito.forEach(item =>{
			if(item.nombre.trim() === nombre){
				item.cantidad++;
			}
		})
	}

	function restaCantidad(event){
		let restaArticulo = event.target;
		let fila = restaArticulo.closest('articuloCarrito');
		let nombre = fila.querySelector(".nombre").textContent;
		carrito.forEach(item =>{
			if(item.nombre.trim() === nombre){
				item.cantidad--;
			}
		})
	}


	let botonIrACarrito = document.getElementById('irACarrito');
	let botonSeguirComprando = document.getElementById('btnCierraDialog');
	let botonHacerPedido = document.getElementById('btnEfectuaPedido');

	botonIrACarrito.addEventListener("click", mostrarModal);

	botonSeguirComprando.addEventListener("click", cerrarModal);
	botonHacerPedido.addEventListener("click", efectuaPedido);


 	function mostrarModal(){
 		document.getElementById("miDialogo").showModal();
 	}

 	function cerrarModal(){
		document.getElementById("miDialogo").close();
 	}


	function addLocalStorage(){
		localStorage.setItem('carrito', JSON.stringify(carrito));
	}

	function milocalStorage(){
		let storage = JSON.parse(localStorage.getItem('carrito'));
		if(storage){
			carrito = storage;
			verCarrito();
		}
	}

    let reloj = 0;
    let frecuencia = 1000;

    function actualizaReloj() {
      let ahora = new Date();
      let fecha = ahora.getDate() + "-" + (ahora.getMonth() + 1) + "-" + ahora.getFullYear();
      let horas= ahora.getHours();
      let minutos=ahora.getMinutes();
      let segundos=ahora.getSeconds();

      switch(segundos){
        case 0: segundos="00";
        break;
        case 1: segundos="01";
        break;
        case 2: segundos="02";
        break;
        case 3: segundos="03";
        break;
        case 4: segundos="04";
        break;
        case 5: segundos="05";
        break;
        case 6: segundos="06";
        break;
        case 7: segundos="07";
        break;
        case 8: segundos="08";
        break;
        case 9: segundos="09";
        break;
        default: segundos=ahora.getSeconds();
        break;
      }
      switch(minutos){
        case 0: minutos="00";
        break;
        case 1: minutos="01";
        break;
        case 2: minutos="02";
        break;
        case 3: minutos="03";
        break;
        case 4: minutos="04";
        break;
        case 5: minutos="05";
        break;
        case 6: minutos="06";
        break;
        case 7: minutos="07";
        break;
        case 8: minutos="08";
        break;
        case 9: minutos="09";
        break;
        default: minutos=ahora.getMinutes();
        break;
      }

      let hora = horas + ":" + minutos + ":" + segundos;
      let escribe = 'Valencia, ' + fecha + ' ' + hora + ' horas';
      let situa = document.getElementById('posicionReloj');
      situa.innerHTML = escribe;
      reloj = setTimeout("actualizaReloj()", frecuencia);
    }

	window.onload=()=>{
		creaListaCriterios();
		creaArticulos(criterios[0]);
		//carrito = new Carrito(23234324);
		verCarrito();
		milocalStorage();
		actualizaReloj();
	}

