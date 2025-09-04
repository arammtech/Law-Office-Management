import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface ICase {
  subject: FormControl<string>;
  PartiesToTheCase: FormControl<number>;
  estimatedTime: FormControl<string>;
  courtType: FormControl<number>;
  AssignedOfficer: FormControl<number>;
  caseNumber: FormControl<string>;
  lawyerOpinion: FormControl<string>;
}
export interface IClient {
  natId: string;
  name: string;
  address: string;
  birth: Date;
  countryId: number;
  phone: string;
}
