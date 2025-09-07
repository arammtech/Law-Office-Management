import { FormControl, FormGroup } from "@angular/forms";
import { IPersonForm } from "./iperson-form";

export interface IClientForm {
  id: FormControl<string>;
  person: FormGroup<IPersonForm>;
}
