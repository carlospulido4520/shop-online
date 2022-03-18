import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public mostrarEditar = false;
  public imagenesSeleccionada: any[] = [];

  constructor(
    private productoService: ProductoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
    if (sessionStorage.getItem('user')) {
      this.mostrarEditar = true;
    }

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

  editar(id: any) {

  }

  open(content: any, imagenes: any) {
    this.imagenesSeleccionada = imagenes;
    this.modalService.open(content,
      { centered: true }
    )
  }


}
