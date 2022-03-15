import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Producto } from '../models/producto';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: AngularFireList<any>;

  constructor(
    private fireBase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

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

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

}
