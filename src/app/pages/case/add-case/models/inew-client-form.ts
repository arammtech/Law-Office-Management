import { FormControl } from "@angular/forms";

export interface INewClientForm {
  natId: FormControl<string>;
  name: FormControl<string>;
  address: FormControl<string>;
  birth: FormControl<Date>;
  countryCode: FormControl<string>;
  phone: FormControl<string>;
}
