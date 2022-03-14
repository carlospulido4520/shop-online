import { Validators, FormBuilder } from '@angular/forms';


export class LoginForm {
    FormLogin() {
        return new FormBuilder().group({
            email: ['', {
                validators: [Validators.required, Validators.nullValidator]
            }],
            password: [null, {
                validators: [Validators.required, Validators.nullValidator]
            }],
        });
    }
}