import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './feature/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  {
    path: "auth",
    loadChildren: () =>
      import('src/app/feature/auth/auth.module').then((mod) => mod.AuthModule)
  },
  {
    path: "productos",
    loadChildren: () =>
      import('src/app/feature/productos/productos.module').then((mod) => mod.ProductosModule)
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
