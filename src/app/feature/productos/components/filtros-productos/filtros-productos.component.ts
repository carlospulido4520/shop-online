import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-productos',
  templateUrl: './filtros-productos.component.html',
  styleUrls: ['./filtros-productos.component.scss']
})
export class FiltrosProductosComponent {

  @Output() categoria: EventEmitter<any[]> = new EventEmitter();

  public categorias = [
    {
      nombre: 'Ropa',
      subcategoria:
        [
          'Para hombre', 'Para mujer', 'Para niños'
        ]
    },
    {
      nombre: 'Calzado',
      subcategoria:
        [
          'Para hombre', 'Para mujer', 'Para niños'
        ]
    },
    { nombre: 'Oriflame', subcategoria: null }
  ];

  public subCategorias: any = [];
  public subCategoriaSeleccionada: any = [];
  public categoriaSeleccionada: any = [];

  constructor() { }

  guardarCategoria(item: any) {
    const igual = this.categoriaSeleccionada.find((x: any) => x === item);
    const index = this.categoriaSeleccionada.findIndex((x: any) => x === item);
    this.categoriaSeleccionada.splice(index, 1);
    this.subCategorias = [];
    this.subCategoriaSeleccionada = [];
    this.categoriaSeleccionada.push(item);
    this.subCategorias = item.subcategoria;
    if (igual) {
      this.categoriaSeleccionada.splice(index, 1);
      this.subCategorias = [];
      this.subCategoriaSeleccionada = [];
    }
    if (!this.categoriaSeleccionada[0]?.subcategoria) {
      this.categoria.emit(this.categoriaSeleccionada);
    }
  }

  existe(item: any): boolean {
    return this.categoriaSeleccionada.find((x: any) => x === item);
  }

  existeSubcategoria(item: string): boolean {
    return this.subCategoriaSeleccionada.find((x: any) => x === item);
  }

  guardarSubCategoria(item: string) {
    const igual = this.subCategoriaSeleccionada.find((x: any) => x === item);
    const index = this.subCategoriaSeleccionada.findIndex((x: any) => x === item);
    this.subCategoriaSeleccionada.splice(index, 1);
    this.subCategoriaSeleccionada.push(item);
    if (igual) {
      this.subCategoriaSeleccionada.splice(index, 1);
    }
    const categoria = [{
      nombre: this.categoriaSeleccionada[0].nombre,
      subcategoria: this.subCategoriaSeleccionada[0]
    }]
    this.categoria.emit(categoria);
  }

}
