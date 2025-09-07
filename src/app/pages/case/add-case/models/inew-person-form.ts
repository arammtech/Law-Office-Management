import { FormControl, FormGroup } from "@angular/forms";

export interface INewPersonForm {
  name: FormControl<string>;
  natId: FormControl<string>;
  birthDate: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
  countryCode: FormControl<string>;
}