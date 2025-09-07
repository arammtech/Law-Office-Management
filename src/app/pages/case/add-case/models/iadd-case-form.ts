import { FormArray, FormGroup } from '@angular/forms';
import { ICaseForm } from './icase-form';
import { INewClientForm } from './inew-client-form';
import { IExistingClientForm } from './iexisting-client-form';

export interface IAddCaseForm {
  case: FormGroup<ICaseForm>;
  existingClients: FormArray<FormGroup<IExistingClientForm>>;
  newClients: FormArray<FormGroup<INewClientForm>>;
}
