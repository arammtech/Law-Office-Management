import { FormGroup } from "@angular/forms";
import { IPersonDetails } from "./iperson-details";


export interface IClientDetails {
  id:string;
  person:FormGroup<IPersonDetails>
}


