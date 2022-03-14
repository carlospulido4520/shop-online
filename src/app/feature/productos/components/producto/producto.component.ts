import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductoForm } from '../../forms/producto.form';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup = new ProductoForm().FormProducto();

  constructor(
    private productoService: ProductoService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  guardarProducto() {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      const valueForm = this.productoForm.value;
      this.productoService.inserProduct(valueForm);
      this.toastService.showSuccess('Tu producto se ha creado correctamente');
      this.productoForm.reset();
    }
  }

}
