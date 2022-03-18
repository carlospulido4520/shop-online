import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FiltroForm } from '../../forms/filtro.form';
import { CATEGORIAS } from '../../utils/categorias';

@Component({
  selector: 'app-filtros-productos',
  templateUrl: './filtros-productos.component.html',
  styleUrls: ['./filtros-productos.component.scss']
})
export class FiltrosProductosComponent implements OnInit {

  @Output() categoria: EventEmitter<any[]> = new EventEmitter();

  public filtrosSeleccionados: any = [];
  public visible: boolean = false;
  public categorias: any = [];
  public subCategorias: any = [];
  public formFiltros: FormGroup = new FiltroForm().FormFiltro();

  constructor() { }

  ngOnInit(): void {
    this.categorias = CATEGORIAS;
    this.cambiarCategoria();
  }

  cambiarCategoria() {
    this.formFiltros.get('categoria')?.valueChanges.subscribe(
      res => {
        this.subCategorias = [];
        this.formFiltros.get('subcategoria')?.setValue(null);
        const categoriaSeleccionada = this.categorias.find((c: any) => c.nombre === res);
        this.subCategorias = categoriaSeleccionada?.subcategoria;
      }
    )
  }

  closePanel() {
    this.visible = false;
  }

  buscar() {
    const formValue = this.formFiltros.value;
    const filtros = [formValue.categoria];
    if (formValue.subcategoria) {
      filtros.push(formValue.subcategoria);
    }
    this.filtrosSeleccionados = filtros;
    if (!formValue.categoria && !formValue.subcategoria) {
      this.filtrosSeleccionados = [];
    }
    const categoria = [{
      nombre: formValue.categoria,
      subcategoria: formValue.subcategoria
    }];
    this.categoria.emit(categoria);
  }

  limpiarFiltros() {
    this.formFiltros.reset();
    this.subCategorias = [];
  }

}
