import { FormControl } from "@angular/forms";

export interface IPersonForm {
  id: FormControl<string>;
  name: FormControl<string>;
  natId: FormControl<string>;
  birthDate: FormControl<string>; // تقدر تخليها Date لو API يرجع Date object
  phone: FormControl<string>;
  address: FormControl<string>;
  countryCode: FormControl<string>;
}
