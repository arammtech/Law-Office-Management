import { FormControl, FormGroup } from "@angular/forms";
import { INewPersonForm } from "../../../../case/add-case/models/inew-person-form";

export interface INewEmployee {
  person: FormGroup<INewPersonForm>;
  email: FormControl<string>;
  role: FormControl<string>;

}
