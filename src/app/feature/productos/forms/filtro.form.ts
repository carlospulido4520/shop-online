import { FormBuilder } from '@angular/forms';


export class FiltroForm {
    FormFiltro() {
        return new FormBuilder().group({
            categoria: [null],
            subcategoria: [null],
        });
    }
}