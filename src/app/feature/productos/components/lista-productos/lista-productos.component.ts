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

  constructor(
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
  }

  consultarProductos() {
    this.productoService.getProductos().snapshotChanges().subscribe(
      (response: any) => {
        this.productos = response.map((element: any) => {
          let dataFireBase = element.payload.toJSON();
          dataFireBase['id'] = element.key;
          return dataFireBase as Producto
        })
      }
    );

  }

}
