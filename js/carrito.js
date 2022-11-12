class Carrito{
	constructor(id){ //id es el identificador del carrito pasado como parámetro
		this.id = id;
		this.articulos = [];
	}

	anyadeArticulo(articulo){

		this.miCarrito.push(articulo);
		verCarrito();
	}

	borraArticulo(codigo){
		let indice = this.miCarrito.findIndex(p => p.codigo = codigo);
		if (indice != -1){
			this.miCarrito.splice(indice,1);
		}
	}

	modificaUnidades(codigo,n){

	}

	verCarrito(){
		console.log(miCarrito);

	}
}
