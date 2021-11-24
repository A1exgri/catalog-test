import {AbstractControl, ValidatorFn} from "@angular/forms";

export function minDateControl(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    console.log(new Date(control.value))
    console.log('control', new Date(new Date().setDate(new Date().getDate())))
    if (new Date(control.value) <= new Date(new Date().setDate(new Date().getDate()))) {
      return {'minDate': true};
    }
    return null;
  }
}
