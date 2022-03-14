import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  getProductos() {
    return this.productos = this.fireBase.list('productos')
  }


  inserProduct(product: Producto) {
    this.productos.push({
      nombre: product.nombre,
      categoria: product.categoria,
      codigo: product.codigo,
      subcategoria: product.subcategoria,
      precio: product.precio,
      imagen: product.imagen,
      informacion: product.informacion,
    })
  }


  deleteProduct(id: string) {
    this.productos.remove(id);
  }

}
