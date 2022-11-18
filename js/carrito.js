class Carrito{

	constructor(id) {
		this.id = id;
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


		alert.classList.remove('hide');

		if (this.articulos.length == 0) {
			let dialogo = document.getElementById("miDialogo");
			setTimeout( function(){ alert.classList.add('hide');
		}, 2500);
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
			casillas[6].innerHTML = this.articulos[pos].unidades * this.articulos[pos].precio+"€";
		}
		this.calcularPrecioTotal();
	}


    verCarrito() {
        let ventanaDialogoCarrito = document.getElementById("miDialogo");
		let idCarrito = document.getElementById("idPedido");
		let botonEliminar = document.getElementById('btnCierraDialog');
        let botonSeguirComprando = document.getElementById('btnCierraDialog');
		let tbody = document.getElementById("tbody");
		let tr = document.createElement("tr");

		idCarrito.innerHTML = id;

		let contenido="";
		carrito.articulos.forEach(a => {
			contenido +=
			`<tr>
				<td class="text-center"><b>${numeroAleatorio}</b></td> &nbsp;&nbsp;
				<td class="text-center"><img src='../assets/img/${a.codigo}.jpg' width='40' height='40' alt='imagen'></td> &nbsp;&nbsp;
				<td class="text-center"><b>${a.nombre}&nbsp;&nbsp;</b></td>&nbsp;
				<td class="text-center">${a.descripcion}&nbsp;&nbsp;&nbsp;&nbsp;</td>&nbsp;
				<td class="text-center">${a.precio}€/ud</td>&nbsp;
				<td class="text-center">${a.unidades}</td>&nbsp;&nbsp;
				<td class="text-center">${a.precio * a.unidades}€</td>&nbsp;&nbsp;
				<td class="text-center">
					&nbsp;&nbsp;&nbsp;&nbsp;<button class="restar btn btn-primary" onclick='carrito.modificaUnidades(${JSON.stringify(a.codigo)}, ${restar})'><b>-</b></button>
					&nbsp;&nbsp;<button class="btn btn-primary" onclick='carrito.modificaUnidades(${JSON.stringify(a.codigo)}, ${sumar})'><b>+</b></button>
					&nbsp;&nbsp;<button class="btn btn-danger alert-danger" onclick='borraArticuloEnCarrito(${JSON.stringify(a.codigo)})'><b>ELIMINAR</b></button>
				</td>
			</tr>`;
			tbody.innerHTML = contenido;
			tbody.append(tr);
			numeroAleatorio=parseInt(Math.random()*(100000-1) + 1);;

			botonEliminar.addEventListener("click", () => this.borraArticulo());
			botonSeguirComprando.addEventListener('click', () => ventanaDialogoCarrito.close());

		});

		this.calcularPrecioTotal();
    }

    addLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }


    miLocalStorage() {
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