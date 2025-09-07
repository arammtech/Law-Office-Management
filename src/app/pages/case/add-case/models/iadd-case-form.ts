import { FormGroup } from '@angular/forms';
import { ICase, IExistingClientModel, INewClientModel } from './icase';
import { IContract } from './icontract';
import { IPOA } from './ipoa';

export interface ICreateCaseModel {
  case: ICase;
  contract: IContract;
  poa: IPOA;
  existingClients: IExistingClientModel[];
  newClients: INewClientModel[];
}
