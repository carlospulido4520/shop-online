import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductoForm } from '../../forms/producto.form';
import { ProductoService } from '../../services/producto.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { CATEGORIAS } from '../../utils/categorias';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, OnDestroy {

  public productoForm: FormGroup = new ProductoForm().FormProducto();
  public archivos: any = [];
  public cargando = false;
  public categorias: any = [];
  public subCategorias: any = [];
  public urlImage: string | undefined;
  public idProducto: string;

  constructor(
    private productoService: ProductoService,
    private toastService: ToastService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.idProducto = "";
    this.productoService.productoSeleccionado = null;
  }

  goBack() {
    this.router.navigate(['../']);
  }

  ngOnInit(): void {
    this.categorias = CATEGORIAS;
    this.productoService.getProductos();
    this.validarSubcategoria();
    this.route.queryParams.subscribe((params) => {
      ({ id: this.idProducto } = params);
      if (this.idProducto) {
        this.setValueForm();
      }
    });
  }

  setValueForm() {
    const producto = this.productoService.productoSeleccionado;
    this.archivos = producto?.imagenes;
    this.productoForm.patchValue({
      nombre: producto?.nombre,
      categoria: producto?.categoria,
      codigo: producto?.codigo,
      subcategoria: producto?.subcategoria,
      precio: producto?.precio,
      imagen: '',
      informacion: producto?.informacion,
      estado: producto?.estado
    });
  }

  guardarProducto() {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      this.cargando = true;
      const valueForm = this.productoForm.value;
      valueForm.imagenes = this.archivos;
      if (this.idProducto) {
        valueForm.id = this.idProducto;
        this.productoService.updateProduct(valueForm);
        this.toastService.showSuccess('Tu producto se ha editado correctamente');
      } else {
        valueForm.estado = 'activo';
        this.productoService.inserProduct(valueForm);
        this.toastService.showSuccess('Tu producto se ha creado correctamente');
      }
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

  borrarArchivo(index: number, url: string) {
    this.storage.refFromURL(url).delete();
    this.archivos.splice(index, 1);
  }

  validarSubcategoria() {
    this.productoForm.get('categoria')?.valueChanges.subscribe(
      res => {
        const categoria = this.categorias.find((x: any) => x.nombre === res);
        this.subCategorias = categoria?.subcategoria;
      }
    )
  }

}
