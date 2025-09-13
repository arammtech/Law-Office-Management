import { AbstractControl, ValidationErrors } from '@angular/forms';

export function featureValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value || !(value instanceof Date)) return null;


  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  return value.getTime() >= Date.now() ? null : { pastDate: true };
}
