class Carrito{

	constructor(idPedido) {
		this.id = idPedido;
		this.articulos = [];
	}

    anyadeArticulo(articulo) {
		let esArticulo = this.articulos.findIndex(a => a.codigo === articulo.codigo);
		let alert=document.querySelector('.alert');

		if (esArticulo != -1) {
			this.articulos[esArticulo].unidades+=1;

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
		document.getElementById("tbody").deleteRow(pos);

		this.articulos.splice(pos, 1);


		if(pos != -1){
			setTimeout( function(){ alert.classList.add('hide');
		}, 2500);
		}


		alert.classList.remove('hide');

		if (this.articulos.length == 0) {
			let dialogo = document.getElementById("miDialogo");
			dialogo.close();
		}
	}


	modificaUnidades(codigo, operacion) {
		let pos = this.articulos.findIndex(c => c.codigo === codigo);

		if (operacion === sumar) {
			this.articulos[pos].unidades += 1;
		} else if (operacion === restar) {
			this.articulos[pos].unidades -= 1;
		}

		if (this.articulos[pos].unidades == 0) {
			this.borraArticulo(codigo);
		} else {
			let casillas = document.getElementById("tbody").rows[pos].cells;
			casillas[5].innerHTML = this.articulos[pos].unidades;
			casillas[6].innerHTML = this.articulos[pos].unidades * this.articulos[pos].precio;
		}
		this.calcularPrecioTotal();
	}


    verCarrito() {
        let ventanaDialogoCarrito = document.getElementById("miDialogo");
		let idCarrito = document.getElementById("idPedido");
        let botonIrACarrito = document.getElementById('irACarrito');
		let botonEliminar = document.getElementById('btnCierraDialog');
        let botonSeguirComprando = document.getElementById('btnCierraDialog');
		let tbody = document.getElementById("tbody");
		let tr = document.createElement("tr");


	

		idCarrito.innerHTML = idPedido;

		let contenido="";
		carrito.articulos.forEach(articulo => {
			contenido +=
			`<tr>
				<td class="text-center"><b>${numeroAleatorio}</b></td>&nbsp;&nbsp;
				<td class="text-center"><img src='../assets/img/${articulo.codigo}.jpg' width='40' height='40' alt='imagen'></th>&nbsp;&nbsp;
				<td class="text-center"><b>${articulo.nombre}&nbsp;&nbsp;</b></td>&nbsp;
				<td class="text-center">${articulo.descripcion}&nbsp;&nbsp;&nbsp;&nbsp;</td>&nbsp;
				<td class="text-center">${articulo.precio}</td>&nbsp;
				<td class="text-center">${articulo.unidades}</td>&nbsp;&nbsp;
				<td class="text-center">${articulo.precio * articulo.unidades}</td>&nbsp;&nbsp;
				<td class="text-center">

				&nbsp;&nbsp;&nbsp;&nbsp;<button id="restar_${articulo.codigo}" class="restar btn btn-primary" onclick='carrito.modificaUnidades(${JSON.stringify(articulo.codigo)}, ${restar})'><b>-</b></button>
				&nbsp;&nbsp;<button class="btn btn-primary" onclick='carrito.modificaUnidades(${JSON.stringify(articulo.codigo)}, ${sumar})'><b>+</b></button>
				&nbsp;&nbsp;<button class="btn btn-danger alert-danger" onclick='borraArticuloEnCarrito(${JSON.stringify(articulo.codigo)})'><b>ELIMINAR</b></button>
				</td>

				</td>
			</tr>`;
			tbody.innerHTML = contenido;
			tbody.append(tr);
			numeroAleatorio=parseInt(Math.random()*(100000-1) + 1);;

		});

		this.calcularPrecioTotal();

		botonEliminar.addEventListener("click", () => this.borraArticulo());
		//botonIrACarrito.addEventListener("click", () => ventanaDialogoCarrito.close());
		botonIrACarrito.addEventListener("click", () => ventanaDialogoCarrito.showModal());
		botonSeguirComprando.addEventListener('click', () => ventanaDialogoCarrito.close());

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