import { FormControl } from "@angular/forms";
import { IPhone } from "./icourt";

export interface INewPersonForm {
  name: FormControl<string>;
  natId: FormControl<string>;
  birthDate: FormControl<string>;
  phone: FormControl<IPhone>;
  address: FormControl<string>;
  countryCode: FormControl<string>;
}