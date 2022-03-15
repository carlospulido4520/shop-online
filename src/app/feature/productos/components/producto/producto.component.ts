import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductoForm } from '../../forms/producto.form';
import { ProductoService } from '../../services/producto.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup = new ProductoForm().FormProducto();
  archivo: any[] = [];
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


  upLoadPercent: Observable<number | undefined>;
  urlImage: Observable<string>;

  constructor(
    private productoService: ProductoService,
    private toastService: ToastService,
    private storage: AngularFireStorage
  ) { }

  @ViewChild('imageUser') inputImageUrl: ElementRef;

  ngOnInit(): void {
    this.productoService.getProductos();
    this.validarSubcategoria();
  }

  guardarProducto() {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      this.cargando = true;
      const valueForm = this.productoForm.value;
      const id = Math.random().toString(36).substring(2);
      const filePath = `uploads/id_${id}`;
      const ref = this.storage.ref(filePath);
      
      const task = this.storage.upload(filePath, this.archivo[0]);
      this.upLoadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
      setTimeout(() => {
        const url = this.inputImageUrl.nativeElement.value;
        valueForm.imagen = url;
        this.productoService.inserProduct(valueForm);
        this.toastService.showSuccess('Tu producto se ha creado correctamente');
        this.productoForm.reset();
        this.archivo = [];
        this.cargando = false;
      }, 2000);
    }
  }


  async onArchivoSeleccionado(evento: any) {
    this.archivo = [];
    const archivo = evento.target.files[0];
    this.archivo.push(archivo);
  }

  borrarArchivo() {
    this.archivo = [];
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
