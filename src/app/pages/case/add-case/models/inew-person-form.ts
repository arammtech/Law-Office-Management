import { FormControl } from '@angular/forms';
import { IPhone } from './iphone';

export interface INewPersonForm {
  name: FormControl<string>;
  natId: FormControl<string>;
  birthDate: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
  countryCode: FormControl<string>;
}
