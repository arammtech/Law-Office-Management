import { FormControl, FormGroup } from '@angular/forms';
import { IPersonForm } from './inew-person-form';

export interface IClientForm {
  id: FormControl<string>;
  person: FormGroup<IPersonForm>;
}
