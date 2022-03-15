import { Validators, FormBuilder } from '@angular/forms';


export class ProductoForm {
    FormProducto() {
        return new FormBuilder().group({
            nombre: ['', {
                validators: [Validators.required, Validators.nullValidator]
            }],
            categoria: [null, {
                validators: [Validators.required, Validators.nullValidator]
            }],
            codigo: [null, {
                validators: [Validators.required, Validators.nullValidator]
            }],
            subcategoria: [null],
            precio: [null, {
                validators: [Validators.required, Validators.nullValidator]
            }],
            imagen: [null],
            informacion: ['', {
                validators: [Validators.required, Validators.nullValidator]
            }],
        });
    }
}