import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltrosProductosComponent } from './components/filtros-productos/filtros-productos.component';


@NgModule({
  declarations: [
    ListaProductosComponent,
    ProductoComponent,
    FiltrosProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductosModule { }
