class Carrito{
    id;
	articulos = [];

	constructor(id) {
		this.id = id;
		this.articulos = [];
	}

    anyadeArticulo(articulo) {
		let esArticulo = this.articulos.find(a => a.codigo === articulo.codigo);
		let alert=document.querySelector('.alert');

		if (esArticulo) {
			this.modificaUnidades(articulo.codigo, "sumar");
			console.log("es")
		} else {
			articulo.unidades = 1;
			this.articulos.push(articulo);
		}

		setTimeout( function(){ alert.classList.add('hide');
			}, 5000);
    	    alert.classList.remove('hide');
    }


	borraArticulo(codigo) {
		let pos = this.articulos.findIndex(c => c.codigo === codigo);
		let alert = document.querySelector('.remove');

		this.articulos.splice(pos, 1);

		document.getElementById("tbody").deleteRow(pos);

		setTimeout( function(){ alert.classList.add('hide');
			}, 2500);

		alert.classList.remove('hide');

		if (this.articulos.length == 0) {
			let dialogo = document.getElementById("miDialogo");
			dialogo.close();
		}
	}


	modificaUnidades(codigo, operacion) {
		let pos = this.articulos.findIndex(c => c.codigo === codigo);

		if (operacion === "sumar") {
			this.articulos[pos].unidades += 1;
		} else if (operacion === "restar") {
			this.articulos[pos].unidades -= 1;
		}

		if (this.articulos[pos].unidades == 0) {
			this.borraArticulo(codigo);
		} else {
			let celdasArticulo = document.getElementById("carrito").rows[pos].cells;
			celdasArticulo[4].innerHTML = this.articulos[pos].unidades;
			celdasArticulo[5].innerHTML = this.articulos[pos].unidades * this.articulos[pos].precio;
		}
		this.calcularPrecioTotal();
	}


    verCarrito() {
        let ventanaDialogoCarrito = document.getElementById("miDialogo");
		let idPedido = document.getElementById("idPedido");
        let botonIrACarrito = document.getElementById('irACarrito');
		let botonEliminar = document.getElementById('btnCierraDialog');
        let botonSeguirComprando = document.getElementById('btnCierraDialog');
        let botonHacerPedido = document.getElementById('btnEfectuaPedido');
		let tbody = document.getElementById("tbody");
		let tr = document.createElement("tr");
		let euro = ",00€";
	/*
		if((carrito.articulos.length == 0 && !window.onload)){
			alert("El carrito está vacio");
			ventanaDialogoCarrito.close();
		}else if(window.onload){
			ventanaDialogoCarrito.close();
		} else{
			ventanaDialogoCarrito.showModal();
		}
	*/
		idPedido.innerHTML = numeroAleatorio;

		let contenido="";
		carrito.articulos.forEach(articulo => {
			contenido +=
			`<tr>
				<td class="text-center"><b>${numeroAleatorio2}</b></td>&nbsp;&nbsp;
				<td class="text-center"><img src='./../assets/img/${articulo.codigo}.jpg' width='50' height='50' alt='imagen'></th>&nbsp;&nbsp;
				<td class="text-center"><b>${articulo.nombre}&nbsp;&nbsp;</b></td>&nbsp;
				<td class="text-center">${articulo.descripcion}&nbsp;&nbsp;&nbsp;&nbsp;</td>&nbsp;
				<td class="text-center">${articulo.precio}${euro}</td>&nbsp;
				<td class="text-center"><b>${articulo.unidades}</b></td>&nbsp;&nbsp;
				<td class="text-center">${articulo.precio * articulo.unidades}${euro}</td>&nbsp;&nbsp;
				<td class="text-center">
					&nbsp;&nbsp;&nbsp;&nbsp;<a id="sumar" class="restar btn btn-primary"><b>-</b></a>
					&nbsp;<a id="restar" class="sumar btn btn-primary"><b>+</b></a>
					&nbsp;<a class="delete btn btn-danger"><b>Eliminar</b></a>
				</td>
			</tr>`
			tbody.innerHTML = contenido;
			tbody.append(tr);
			numeroAleatorio2=parseInt(Math.random()*(100000-1) + 1);;

		});

		this.calcularPrecioTotal();

		botonEliminar.addEventListener("click", () => this.borraArticulo());
		botonIrACarrito.addEventListener("click", () => ventanaDialogoCarrito.showModal());
		botonSeguirComprando.addEventListener('click', () => ventanaDialogoCarrito.close());
		botonHacerPedido.addEventListener('click', () => efectuaPedido());

    }


    addLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }


    milocalStorage() {
        let storage = JSON.parse(localStorage.getItem('carrito'));
        if(storage){
        carrito = storage;
        verCarro();
        }
    }

    calcularPrecioTotal() {
		let totalImporte = document.getElementById("total");
		let totalPrecio = 0;
		this.articulos.forEach(a => {
			totalPrecio += (a.precio * a.unidades);
		});
		totalImporte.innerHTML = totalPrecio + ",00€";
	}
}