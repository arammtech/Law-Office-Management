import { FormGroup } from '@angular/forms';
import { INewPersonForm } from './inew-person-form';

export interface INewClientForm {
  person: FormGroup<INewPersonForm>;
}
