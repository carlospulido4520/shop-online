import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductoForm } from '../../forms/producto.form';
import { ProductoService } from '../../services/producto.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup = new ProductoForm().FormProducto();
  archivos: any[] = [];
  cargando = false;
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
  urlImage: string | undefined;

  constructor(
    private productoService: ProductoService,
    private toastService: ToastService,
    private storage: AngularFireStorage
  ) { }



  ngOnInit(): void {
    this.productoService.getProductos();
    this.validarSubcategoria();
  }

  guardarProducto() {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      this.cargando = true;
      const valueForm = this.productoForm.value;
      valueForm.imagenes = this.archivos;
      valueForm.estado = 'activo';
      this.productoService.inserProduct(valueForm);
      this.toastService.showSuccess('Tu producto se ha creado correctamente');
      this.productoForm.reset();
      this.archivos = [];
      this.cargando = false;

    }
  }


  async onArchivoSeleccionado(evento: any) {
    const archivo = evento.target.files[0];
    const id = Math.random().toString(36).substring(2);
    const filePath = `uploads/id_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, archivo);
    await task.snapshotChanges().pipe(finalize(async () => {
      this.urlImage = await ref.getDownloadURL().toPromise();
      const archivoConURL = { imagen: archivo.name, url: this.urlImage };
      this.archivos.push(archivoConURL);
    })).toPromise();
  }

  borrarArchivo(index: number) {
    this.archivos.splice(index, 1);
  }

  validarSubcategoria() {
    this.productoForm.get('categoria')?.valueChanges.subscribe(
      res => {
        const categoria = this.categorias.find(x => x.nombre === res);
        this.subCategorias = categoria?.subcategoria;
      }
    )
  }

}
