import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  public productos: Producto[] = [];
  public spinner = false;
  public categoria: any;
  public productosMostrar: Producto[] = [];


  constructor(
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos() {
    this.spinner = true;
    this.productoService.getProductos().snapshotChanges().subscribe(
      (response: any) => {
        const productos = response.map((element: any) => {
          let dataFireBase = element.payload.toJSON();
          dataFireBase['id'] = element.key;
          return dataFireBase as Producto
        });
        this.productos = productos.map((producto: Producto) => {
          return {
            ...producto,
            imagenes: Object.values(producto.imagenes)
          }
        });
        this.spinner = false;
      }, error => {
        this.spinner = false;
      }
    );
  }

  categoriaSeleccionada(categoria: any) {
    const categoriaSeleccionada = categoria[0];
    this.categoria = categoriaSeleccionada;
    if (categoriaSeleccionada) {
      const categoriaPadre = this.productos.filter(producto => producto.categoria === categoriaSeleccionada.nombre);
      this.productosMostrar = categoriaPadre;
      if (categoriaSeleccionada.subcategoria) {
        const subcategoria = categoriaPadre.filter(producto => producto.subcategoria === categoriaSeleccionada.subcategoria);
        this.productosMostrar = subcategoria;
      }
    }
  }


}
