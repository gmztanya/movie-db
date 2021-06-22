import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function RegExCustomValidator(exp:RegExp): ValidatorFn {
    return (control:AbstractControl):(ValidationErrors | null) => {
        return (control.value)?(!exp.test(control.value))?{'regExError':true}:null:null;
    }
}
