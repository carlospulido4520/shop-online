import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'lista', component: ListaProductosComponent },
  { path: 'crear', component: ProductoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
