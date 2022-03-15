import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioPermitidoGuard } from 'src/app/core/guard/usuario-permitido.guard';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'lista', component: ListaProductosComponent },
  { path: 'crear', component: ProductoComponent, canActivate: [UsuarioPermitidoGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
