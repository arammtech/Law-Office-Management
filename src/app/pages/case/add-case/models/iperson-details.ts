import { FormControl } from "@angular/forms";
import { INewPersonForm } from "./inew-person-form";

export interface IPersonDetails extends INewPersonForm {
  id:FormControl<string>;
}
