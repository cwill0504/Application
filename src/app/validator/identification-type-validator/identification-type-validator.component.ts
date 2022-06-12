
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createIdentificationTypesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const count = value.filter(Boolean).length;

    if (count < 1) {
      return { minimum: true };
    } else if (count > 2) {
      return { maximum: true };
    } else {
      return null;
    }
  }
}